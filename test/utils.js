/* istanbul ignore file */
import { jest } from '@jest/globals'
import portfinder from 'portfinder'
import { Readable, Transform, Writable } from 'stream'
import supertest from 'supertest'
import server from '../src/server.js'

const getAvailablePort = portfinder.getPortPromise
export default class TestUtil {
  static generateReadableStream(data) {
    return new Readable({
      read() {
        for (const item of data) {
          this.push(item)
        }

        this.push(null)
      }
    })
  }

  static generateWritableStream(onData) {
    return new Writable({
      write(chunk, enc, cb) {
        onData(chunk)

        cb(null, chunk)
      }
    })
  }

  static defaultHandleParams() {
    const requestStream = TestUtil.generateReadableStream([''])

    const response = TestUtil.generateWritableStream(() => {})

    const data = {
      request: Object.assign(requestStream, {
        headers: {},
        method: '',
        url: ''
      }),
      response: Object.assign(response, {
        writeHead: jest.fn(),
        end: jest.fn()
      })
    }

    return {
      values: () => Object.values(data),
      ...data
    }
  }

  static pipeAndReadStreamData(stream, onChunk) {
    const transform = new Transform({
      transform(chunk, enc, cb) {
        onChunk(chunk)

        cb(null, chunk)
      }
    })

    return stream.pipe(transform)
  }

  static async getTestServer() {
    const getSuperTest = (port) => supertest(`http://localhost:${port}`)

    const port = await getAvailablePort()

    return new Promise((resolve) => {
      const createdServer = server()
        .listen(port)
        .once('listening', () => {
          const testServer = getSuperTest(port)

          const response = {
            testServer,
            kill() {
              createdServer.close()
            }
          }

          return resolve(response)
        })
    })
  }

  static getSpawnResponse({ stdout = '', stderr = '', stdin = () => {} }) {
    return {
      stdout: TestUtil.generateReadableStream([stdout]),
      stderr: TestUtil.generateReadableStream([stderr]),
      stdin: TestUtil.generateWritableStream(stdin)
    }
  }

  static makeButtonEelement(
    { text, classList } = {
      text: '',
      classList: { add: jest.fn(), remove: jest.fn() }
    }
  ) {
    return {
      onclick: jest.fn(),
      classList,
      innerText: text
    }
  }
}
