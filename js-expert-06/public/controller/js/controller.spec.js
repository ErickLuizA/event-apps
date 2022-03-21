import { expect, describe, test, jest, beforeEach } from '@jest/globals'

import Controller from './controller.js'

const dependencies = {
  view: {
    configureOnButtonClick: jest.fn(),
    onLoad: jest.fn()
  },
  service: {
    makeRequest: jest.fn().mockResolvedValue()
  }
}

describe('#Controller', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('#onLoad', () => {
    const controller = new Controller(dependencies)

    controller.onLoad()

    jest.spyOn(controller.commandReceived, controller.commandReceived.bind.name)

    const [call] = dependencies.view.configureOnButtonClick.mock.lastCall

    expect(call.name).toStrictEqual(
      controller.commandReceived.bind(controller).name
    )
    expect(dependencies.view.onLoad).toHaveBeenCalled()
  })

  test('#commandReceived', async () => {
    const controller = new Controller(dependencies)

    const data = 'hey there'

    await controller.commandReceived(data)

    const expectedCall = {
      command: data
    }

    expect(dependencies.service.makeRequest).toHaveBeenCalledWith(expectedCall)
  })

  test('#initialize', () => {
    jest
      .spyOn(Controller.prototype, Controller.prototype.onLoad.name)
      .mockReturnValue()

    const controller = Controller.initialize(dependencies)
    const controllerContructor = new Controller(dependencies)

    expect(Controller.prototype.onLoad).toHaveBeenCalled()
    expect(controller).toStrictEqual(controllerContructor)
  })
})
