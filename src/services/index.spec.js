import { describe, expect, jest, test } from '@jest/globals'
import fs from 'fs'
import fsPromises from 'fs/promises'
import streamsAsync from 'stream/promises'
import { join } from 'path'
import TestUtil from '../../test/utils.js'
import config from '../utils/config.js'
import { Service } from './index.js'
import Throttle from 'throttle'
import { PassThrough, Writable } from 'stream'
import childProcess from 'child_process'

const {
  dir: { publicDirectory },
  constants: { fallbackBiteRate, bitRateDivisor }
} = config

describe('#Service', () => {
  test('#startStreamming', async () => {
    const service = new Service()

    const currentSong = 'song.mp3'

    service.currentSong = currentSong

    const currentReadable = TestUtil.generateReadableStream(['abc'])
    const writableBroadCaster = TestUtil.generateWritableStream(() => {})

    const expectedResult = 'ok'

    jest
      .spyOn(service, service.getBitRate.name)
      .mockResolvedValue(fallbackBiteRate)

    jest
      .spyOn(service, service.createFileStream.name)
      .mockReturnValue(currentReadable)

    jest
      .spyOn(streamsAsync, streamsAsync.pipeline.name)
      .mockResolvedValue(expectedResult)

    jest
      .spyOn(service, service.broadcast.name)
      .mockReturnValue(writableBroadCaster)

    const expectedThrottle = fallbackBiteRate / bitRateDivisor

    const result = await service.startStreamming()

    expect(service.currentBitRate).toEqual(expectedThrottle)
    expect(result).toEqual(expectedResult)

    expect(service.getBitRate).toHaveBeenCalledWith(currentSong)
    expect(service.createFileStream).toHaveBeenCalledWith(currentSong)
    expect(streamsAsync.pipeline).toHaveBeenCalledWith(
      currentReadable,
      service.throttleTransform,
      service.broadcast()
    )
  })

  test('#stopStreamming', () => {
    const service = new Service()

    service.throttleTransform = new Throttle(1)

    jest.spyOn(service.throttleTransform, 'end').mockReturnValue()

    service.stopStreamming()

    expect(service.throttleTransform.end).toHaveBeenCalled()
  })

  test('#createClientStream', () => {
    const service = new Service()

    jest
      .spyOn(service.clientStreams, service.clientStreams.set.name)
      .mockReturnValue()

    const { id, clientStream } = service.createClientStream()

    expect(id.length).toBeGreaterThan(0)
    expect(clientStream).toBeInstanceOf(PassThrough)
    expect(service.clientStreams.set).toHaveBeenCalledWith(id, clientStream)
  })

  test('#removeClientStream', () => {
    const service = new Service()

    jest
      .spyOn(service.clientStreams, service.clientStreams.delete.name)
      .mockReturnValue()

    const mockId = '1'

    service.removeClientStream(mockId)

    expect(service.clientStreams.delete).toHaveBeenCalledWith(mockId)
  })

  test('#broadcast', () => {
    const service = new Service()

    const onData = jest.fn()
    const client1 = TestUtil.generateWritableStream(onData)
    const client2 = TestUtil.generateWritableStream(onData)

    jest.spyOn(service.clientStreams, service.clientStreams.delete.name)

    service.clientStreams.set('1', client1)
    service.clientStreams.set('2', client2)

    client2.end()

    const writable = service.broadcast()

    writable.write('Hello World')

    expect(writable).toBeInstanceOf(Writable)
    expect(service.clientStreams.delete).toHaveBeenCalled()
    expect(onData).toHaveBeenCalledTimes(1)
  })

  test('#getBitRate -- it should return given song bitrate', async () => {
    const service = new Service()

    const song = 'song.mp3'

    const spawnResponse = TestUtil.getSpawnResponse({
      stdout: '1k'
    })

    const _executeSoxCommand = jest
      .spyOn(service, service._executeSoxCommand.name)
      .mockReturnValue(spawnResponse)

    const result = await service.getBitRate(song)

    expect(result).toStrictEqual('1000')
    expect(_executeSoxCommand).toHaveBeenCalledWith(['--i', '-B', song])
  })

  test('#getBitRate -- it should return fallback bitrate when error occur', async () => {
    const service = new Service()

    const song = 'song.mp3'

    const spawnResponse = TestUtil.getSpawnResponse({
      stderr: 'error'
    })

    const _executeSoxCommand = jest
      .spyOn(service, service._executeSoxCommand.name)
      .mockReturnValue(spawnResponse)
    const result = await service.getBitRate(song)

    expect(result).toStrictEqual(fallbackBiteRate)
    expect(_executeSoxCommand).toHaveBeenCalledWith(['--i', '-B', song])
  })

  test('#_executeSoxCommand', () => {
    const service = new Service()

    const args = ['--i', '-B', '🔥🔥']

    const response = TestUtil.getSpawnResponse({ stdout: '1k' })

    const spawn = jest
      .spyOn(childProcess, childProcess.spawn.name)
      .mockReturnValue(response)

    const result = service._executeSoxCommand(args)

    expect(spawn).toHaveBeenCalledWith('sox', args)
    expect(result).toStrictEqual(response)
  })

  test('#createFileStream', () => {
    const service = new Service()

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    const fileName = 'fileName.txt'

    jest.spyOn(fs, fs.createReadStream.name).mockReturnValueOnce(mockFileStream)

    const result = service.createFileStream(fileName)

    expect(fs.createReadStream).toHaveBeenCalledWith(fileName)
    expect(result).toStrictEqual(mockFileStream)
  })

  test('#getFileInfo', async () => {
    const service = new Service()

    const fileName = 'fileName.txt'

    const fullFilePath = join(publicDirectory, fileName)
    const fileType = '.txt'

    jest.spyOn(fsPromises, fsPromises.access.name).mockReturnValueOnce()

    const result = await service.getFileInfo(fileName)

    expect(fsPromises.access).toHaveBeenCalledWith(fullFilePath)
    expect(result).toStrictEqual({
      type: fileType,
      path: fullFilePath
    })
  })

  test('#getFileStream', async () => {
    const service = new Service()

    const fileName = 'fileName.txt'
    const type = '.txt'
    const path = '/public/fileName.txt'

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    jest
      .spyOn(service, service.getFileInfo.name)
      .mockReturnValueOnce({ type, path })

    jest
      .spyOn(service, service.createFileStream.name)
      .mockReturnValueOnce(mockFileStream)

    const result = await service.getFileStream(fileName)

    expect(service.getFileInfo).toHaveBeenCalledWith(fileName)
    expect(service.createFileStream).toHaveBeenCalledWith(path)
    expect(result).toStrictEqual({
      type: type,
      stream: mockFileStream
    })
  })
})
