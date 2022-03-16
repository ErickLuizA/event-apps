import { describe, expect, jest, test } from '@jest/globals'
import TestUtil from '../../test/utils.js'
import { Controller } from '../controllers/index.js'
import config from '../utils/config.js'
import { handler } from './index.js'

const { pages, location, constants: { CONTENT_TYPE } } = config

describe('#Routes', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('GET / - should redirect to home page', async () => {
    const params = TestUtil.defaultHandleParams()

    params.request.method = 'GET'
    params.request.url = '/'

    await handler(...params.values())

    expect(params.response.writeHead).toBeCalledWith(302, {
      Location: location.home,
    })
    expect(params.response.end).toHaveBeenCalled()
  })

  test(`GET /home - should respond with ${pages.homeHTML} file stream`, async () => {
    const params = TestUtil.defaultHandleParams()

    params.request.method = 'GET'
    params.request.url = '/home'

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    jest
      .spyOn(Controller.prototype, Controller.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
      })

    jest.spyOn(mockFileStream, 'pipe').mockReturnValue()

    await handler(...params.values())

    expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHTML)
    expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
  })

  test(`GET /controller - should respond with ${pages.controllerHTML} file stream`, async () => {
    const params = TestUtil.defaultHandleParams()

    params.request.method = 'GET'
    params.request.url = '/controller'

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    jest
      .spyOn(Controller.prototype, Controller.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
      })

    jest.spyOn(mockFileStream, 'pipe').mockReturnValue()

    await handler(...params.values())

    expect(Controller.prototype.getFileStream).toBeCalledWith(pages.controllerHTML)
    expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
  })

  test('GET /index.html - should respond with file stream', async () => {
    const params = TestUtil.defaultHandleParams()

    const fileName = '/index.html'
    const expectedType = '.html'

    params.request.method = 'GET'
    params.request.url = fileName

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    jest
      .spyOn(Controller.prototype, Controller.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
        type: expectedType,
      })

    jest.spyOn(mockFileStream, 'pipe').mockReturnValue()

    await handler(...params.values())

    expect(Controller.prototype.getFileStream).toBeCalledWith(fileName)
    expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    expect(params.response.writeHead).toHaveBeenCalledWith(200, {
      'Content-Type': CONTENT_TYPE[expectedType],
    })
  })

  test('GET /file.ext - should respond with file stream', async () => {
    const params = TestUtil.defaultHandleParams()

    const fileName = '/file.ext'
    const expectedType = '.ext'

    params.request.method = 'GET'
    params.request.url = fileName

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    jest
      .spyOn(Controller.prototype, Controller.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
        type: expectedType,
      })

    jest.spyOn(mockFileStream, 'pipe').mockReturnValue()

    await handler(...params.values())

    expect(Controller.prototype.getFileStream).toBeCalledWith(fileName)
    expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    expect(params.response.writeHead).not.toHaveBeenCalledWith()
  })

  test('POST /unknown - given an inexistent route it should respond with 404', async () => {
    const params = TestUtil.defaultHandleParams()

    params.request.method = 'POST'
    params.request.url = '/unknown'

    await handler(...params.values())

    expect(params.response.writeHead).toHaveBeenCalledWith(404)
    expect(params.response.end).toHaveBeenCalled()
  })

  describe('Exceptions', () => {
    test('given inexistent file it should respond with 404', async () => {
      const params = TestUtil.defaultHandleParams()

      params.request.method = 'GET'
      params.request.url = '/index.png'

      jest
        .spyOn(Controller.prototype, Controller.prototype.getFileStream.name)
        .mockRejectedValue(new Error('Error: ENOENT: no such file or directory'))

      await handler(...params.values())

      expect(params.response.writeHead).toHaveBeenCalledWith(404)
      expect(params.response.end).toHaveBeenCalled()
    })

    test('given an error it should respond with 500', async () => {
      const params = TestUtil.defaultHandleParams()

      params.request.method = 'GET'
      params.request.url = '/index.png'

      jest
        .spyOn(Controller.prototype, Controller.prototype.getFileStream.name)
        .mockRejectedValue(new Error('Error:'))

      await handler(...params.values())

      expect(params.response.writeHead).toHaveBeenCalledWith(500)
      expect(params.response.end).toHaveBeenCalled()
    })
  })
})