import { describe, expect, jest, test } from '@jest/globals'
import { Controller } from './index.js'
import TestUtil from '../../test/utils.js'
import { Service } from '../services/index.js'

describe('#Controller', () => {
  test('#getFileStream - it should call getFileStream with given filename', async () => {
    const controller = new Controller()

    const fileName = 'fileName.txt'
    const response = { type: '.txt', stream: {} }

    jest
      .spyOn(controller.service, controller.service.getFileStream.name)
      .mockResolvedValueOnce(response)

    const result = await controller.getFileStream(fileName)

    expect(controller.service.getFileStream).toHaveBeenCalledWith(fileName)
    expect(result).toStrictEqual(response)
  })

  test('#createClientStream - it should return stream and onClose', async () => {
    const controller = new Controller()

    const clientStream = TestUtil.generateReadableStream('data')

    const createClientStream = jest
      .spyOn(controller.service, controller.service.createClientStream.name)
      .mockReturnValueOnce({ id: 1, clientStream })

    const result = controller.createClientStream()

    expect(createClientStream).toHaveBeenCalled()
    expect(result).toStrictEqual({
      stream: clientStream,
      onClose: expect.any(Function)
    })
  })

  test('#createClientStream - it should call removeClientStream when call onClose', async () => {
    const controller = new Controller()

    const clientStream = TestUtil.generateReadableStream('data')

    jest
      .spyOn(controller.service, controller.service.createClientStream.name)
      .mockReturnValueOnce({ id: 1, clientStream })

    const removeClientStream = jest.spyOn(
      controller.service,
      controller.service.removeClientStream.name
    )

    const result = controller.createClientStream()

    result.onClose()

    expect(removeClientStream).toHaveBeenCalledWith(1)
  })

  describe('handleCommand', () => {
    test.each([
      { command: 'start', method: 'startStreamming' },
      { command: 'stop', method: 'stopStreamming' }
    ])(
      'it should return result ok when successfully send command',
      async ({ command, method }) => {
        const controller = new Controller()

        jest
          .spyOn(controller.service, controller.service[method].name)
          .mockResolvedValueOnce()

        const result = await controller.handleCommand({ command })

        expect(controller.service[method]).toHaveBeenCalled()
        expect(result).toStrictEqual({
          result: 'ok',
          command
        })
      }
    )

    test('it should throw error when called with unsupported command', () => {
      const controller = new Controller()

      expect(() =>
        controller.handleCommand({ command: 'end_of_all_things' })
      ).rejects.toThrowError('Unsupported command')
    })

    test('it should call readFxByName and appendFxStream when called with fx command', async () => {
      const controller = new Controller()

      const fxName = 'applause'

      jest
        .spyOn(Service.prototype, Service.prototype.readFxByName.name)
        .mockResolvedValue(fxName)

      jest
        .spyOn(Service.prototype, Service.prototype.appendFxStream.name)
        .mockReturnValue()

      const result = await controller.handleCommand({ command: fxName })

      expect(result).toStrictEqual({
        result: 'ok',
        command: fxName
      })

      expect(Service.prototype.readFxByName).toHaveBeenCalledWith(
        fxName.toLowerCase()
      )
      expect(Service.prototype.appendFxStream).toHaveBeenCalledWith(fxName)
    })
  })
})
