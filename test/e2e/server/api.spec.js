import { describe, expect, jest, test } from '@jest/globals'
import { readFileSync } from 'fs'
import { join } from 'path'
import { setTimeout } from 'timers/promises'
import config from '../../../server/utils/config.js'
import TestUtil from '../../utils'

const { location, pages, dir, constants: { CONTENT_TYPE } } = config

const RETENTION_DATA_PERIOD = 200

describe('API e2e', () => {
  const possibleCommands = {
    start: 'start',
    stop: 'stop'
  }

  function commandSender(testServer) {
    return {
      async send(command) {
        const response = await testServer
          .post('/controller')
          .send({
            command
          })

        expect(response.text).toStrictEqual(JSON.stringify({ result: 'ok', command }))
      }
    }
  }

  describe('/ (GET)', () => {
    test(`it should redirect to ${location.home}`, async () => {
      const server = await TestUtil.getTestServer()

      const response = await server.testServer.get('/')

      expect(response.status).toEqual(302)
      expect(response.header.location).toEqual(location.home)

      server.kill()
    })
  })

  describe('/home (GET)', () => {
    test(`it should get ${pages.homeHTML}`, async () => {
      const server = await TestUtil.getTestServer()

      const response = await server.testServer.get('/home')

      const page = readFileSync(join(dir.publicDirectory, pages.homeHTML))

      expect(response.status).toEqual(200)
      expect(response.text).toStrictEqual(page.toString())

      server.kill()
    })
  })

  describe('/controller (GET)', () => {
    test(`it should get ${pages.controllerHTML}`, async () => {
      const server = await TestUtil.getTestServer()

      const response = await server.testServer.get('/controller')

      const page = readFileSync(join(dir.publicDirectory, pages.controllerHTML))

      expect(response.status).toEqual(200)
      expect(response.text).toStrictEqual(page.toString())

      server.kill()
    })
  })

  describe('/stream (GET)', () => {
    test('it should not receive data stream if the proccess is not playing', async () => {
      const server = await TestUtil.getTestServer()

      const onChunk = jest.fn()

      TestUtil.pipeAndReadStreamData(
        server.testServer.get('/stream'),
        onChunk
      )

      await setTimeout(RETENTION_DATA_PERIOD)

      server.kill()

      expect(onChunk).not.toHaveBeenCalled()
    })

    test('it should receive data stream if the proccess is playing', async () => {
      const server = await TestUtil.getTestServer()

      const onChunk = jest.fn()

      const { send } = commandSender(server.testServer)

      TestUtil.pipeAndReadStreamData(
        server.testServer.get('/stream'),
        onChunk
      )

      await send(possibleCommands.start)

      await setTimeout(RETENTION_DATA_PERIOD)

      await send(possibleCommands.stop)

      const [[buffer]] = onChunk.mock.calls

      expect(buffer).toBeInstanceOf(Buffer)
      expect(buffer.length).toBeGreaterThan(1000)

      server.kill()
    })
  })

  describe('/controller (POST)', () => {
    test.each([
      { command: 'start' },
      { command: 'stop' }
    ])('it should return result ok when successfully send command', async ({ command }) => {
      const server = await TestUtil.getTestServer()

      const response = await server
        .testServer
        .post('/controller')
        .send({ command })

      expect(response.status).toEqual(200)
      expect(response.text).toStrictEqual(JSON.stringify({ result: 'ok', command }))

      server.kill()
    })

    test('it should return status 500 when unsupported command is used', async () => {
      const server = await TestUtil.getTestServer()

      const response = await server
        .testServer
        .post('/controller')
        .send({ command: 'end_of_the_world' })

      expect(response.status).toEqual(500)
      expect(response.text).not.toStrictEqual(JSON.stringify({ result: 'ok', command: 'end_of_the_world' }))

      server.kill()
    })
  })

  describe('/... (GET)', () => {
    test.each([
      { path: '/home/assets/cover.png', extension: '.png' },
      { path: '/home/css/styles.css', extension: '.css' },
      { path: '/home/js/animation.js', extension: '.js' },
      { path: '/controller/assets/JS.png', extension: '.png' },
      { path: '/controller/css/index.css', extension: '.css' }
    ])('it should get a static resource', async ({ path, extension }) => {
      const server = await TestUtil.getTestServer()

      const response = await server
        .testServer
        .get(path)

      const file = readFileSync(join(dir.publicDirectory, path))

      expect(response.status).toEqual(200)
      expect(response.text).toStrictEqual(file.toString())

      server.kill()
    })
  })

  describe('/[not_found]', () => {
    test('it should return 404 when call not supported route', async () => {
      const server = await TestUtil.getTestServer()

      const response = await server.testServer.get('/skmdsmksmk')

      expect(response.status).toEqual(404)

      server.kill()
    })
  })
})