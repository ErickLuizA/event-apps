import { describe, expect, jest, test } from '@jest/globals'
import { Controller } from '../../../server/controller.js'

describe('#Controller', () => {
  test('it should call getFileStream with given filename', async () => {
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
})