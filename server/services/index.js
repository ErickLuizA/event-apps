import { randomUUID } from 'crypto'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { extname, join } from 'path'
import { PassThrough, Writable } from 'stream'
import streamsPromises from 'stream/promises'
import Throttle from 'throttle'
import config from '../utils/config.js'
import { getBitRate } from '../utils/getBitRate.js'
import { logger } from '../utils/logger.js'

const { dir: { publicDirectory }, constants: { englishConversation, bitRateDivisor } } = config

export class Service {
  constructor() {
    this.clientStreams = new Map()
    this.currentSong = englishConversation
    this.currentBitRate = 0
    this.throttleTransform = {}
    this.currentReadable = {}
  }

  async startStreamming() {
    logger.info(`Streaming ${this.currentSong}`)

    const bitRate = this.currentBitRate = (await getBitRate(this.currentSong)) / bitRateDivisor

    const throttleTransform = this.throttleTransform = new Throttle(bitRate)

    const songReadable = this.currentReadable = this.createFileStream(this.currentSong)

    return streamsPromises.pipeline(
      songReadable,
      throttleTransform,
      this.broadcast()
    )
  }

  stopStreamming() {
    logger.info(`Stop streaming ${this.currentSong}`)

    this.throttleTransform?.end?.()
  }

  createClientStream() {
    const id = randomUUID()

    const clientStream = new PassThrough()

    this.clientStreams.set(id, clientStream)

    return {
      id,
      clientStream
    }
  }

  removeClientStream(id) {
    this.clientStreams.delete(id)
  }

  broadcast() {
    return new Writable({
      write: (chunk, enc, cb) => {
        for (const [id, stream] of this.clientStreams) {
          if (stream.writableEnded) {
            this.clientStreams.delete(id)

            continue
          }

          stream.write(chunk)
        }

        cb()
      }
    })
  }

  createFileStream(filename) {
    return fs.createReadStream(filename)
  }

  async getFileInfo(filename) {
    const fullFilePath = join(publicDirectory, filename)

    await fsPromises.access(fullFilePath)

    const fileType = extname(fullFilePath)

    return {
      type: fileType,
      path: fullFilePath
    }
  }

  async getFileStream(filename) {
    const { path, type } = await this.getFileInfo(filename)

    return {
      stream: this.createFileStream(path),
      type
    }
  }
}