import { describe, jest, expect, test, beforeEach } from '@jest/globals'
import { JSDOM } from 'jsdom'
import TestUtil from '../../../test/utils.js'
import View from './view.js'

describe('#View', () => {
  const dom = new JSDOM()

  global.document = dom.window.document
  global.window = dom.window

  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()

    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(TestUtil.makeButtonElement())
  })

  test('#constructor', () => {
    const view = new View()

    const button = document.getElementById()

    expect(view.buttonStart).toStrictEqual(button)
    expect(view.buttonStop).toStrictEqual(button)
    expect(view.buttons).toBeInstanceOf(Function)
    expect(view.ignoreButtons).toBeInstanceOf(Set)
    expect(view.onButtonClick).toBeInstanceOf(Function)
    expect(view.DISABLE_BUTTON_TIMEOUT).toEqual(500)

    expect(() => view.onButtonClick()).not.toThrow()
  })

  test('#onLoad', () => {
    const view = new View()

    jest.spyOn(view, view.changeCommandButtonsVisibility.name).mockReturnValue()

    view.onLoad()

    expect(view.changeCommandButtonsVisibility).toHaveBeenCalled()
    expect(view.buttonStart.onclick.name).toStrictEqual(
      view.onStartClicked.bind(view).name
    )
  })

  test('#changeCommandButtonsVisibility - given hide=true it should add unassigned class and reset onclick', () => {
    const view = new View()
    const button = TestUtil.makeButtonElement()

    jest.spyOn(document, 'querySelectorAll').mockReturnValue([button])

    view.changeCommandButtonsVisibility()

    expect(button.classList.add).toHaveBeenCalledWith('unassigned')
    expect(button.onclick.name).toStrictEqual('onClickReset')

    expect(() => button.onclick()).not.toThrow()
  })

  test('#changeCommandButtonsVisibility - given hide=false it should remove unassigned class and reset onclick', () => {
    const view = new View()
    const button = TestUtil.makeButtonElement()

    jest.spyOn(document, 'querySelectorAll').mockReturnValue([button])

    view.changeCommandButtonsVisibility(false)

    expect(button.classList.add).not.toHaveBeenCalledWith('unassigned')
    expect(button.classList.remove).toHaveBeenCalledWith('unassigned')
    expect(button.onclick.name).toStrictEqual('onClickReset')

    expect(() => button.onclick()).not.toThrow()
  })

  test('#configureOnButtonClick', () => {
    const view = new View()

    const fn = jest.fn()

    view.configureOnButtonClick(fn)

    expect(view.onButtonClick).toStrictEqual(fn)
  })

  test('#onStartClicked', async () => {
    const view = new View()

    const button = TestUtil.makeButtonElement()

    jest.spyOn(view, view.onButtonClick.name)
    jest.spyOn(view, view.changeCommandButtonsVisibility.name).mockReturnValue()
    jest.spyOn(view, view.toggleStartButton.name).mockReturnValue()
    jest.spyOn(view, view.isNotUnassigedButton.name).mockReturnValue(true)
    jest.spyOn(view, view.setupButtonAction.name).mockReturnValue()
    jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce([button])

    const args = { srcElement: { innerText: 'hello world' } }

    await view.onStartClicked(args)

    expect(view.onButtonClick).toHaveBeenCalledWith(args.srcElement.innerText)
    expect(view.changeCommandButtonsVisibility).toHaveBeenCalledWith(false)
    expect(view.toggleStartButton).toHaveBeenCalledWith(true)
    expect(view.isNotUnassigedButton).toHaveBeenCalledWith(button)
    expect(view.setupButtonAction).toHaveBeenCalledTimes(1)
  })

  test('#setupButtonAction - given start command it should do nothing', () => {
    const view = new View()
    const button = TestUtil.makeButtonElement({ text: 'start' })

    const result = view.setupButtonAction(button)
    const buttonOnClick = button.onclick()
    const expected = jest.fn()()

    expect(result).toBeUndefined()
    expect(buttonOnClick).toStrictEqual(expected)
  })

  test('#setupButtonAction - given stop command it should set button onclick to onStopButton', () => {
    const view = new View()
    const button = TestUtil.makeButtonElement({ text: 'stop' })

    view.setupButtonAction(button)

    expect(button.onclick.name).toStrictEqual(view.onStopButton.bind(view).name)
  })

  test('#setupButtonAction - given non start or stop command it should set button onclick with onCommandClick', () => {
    const view = new View()
    const button = TestUtil.makeButtonElement({ text: 'hello' })

    view.setupButtonAction(button)

    expect(button.onclick.name).toStrictEqual(
      view.onCommandClick.bind(view).name
    )
  })

  test('#onCommandClick', async () => {
    const view = new View()
    const button = {
      srcElement: TestUtil.makeButtonElement({
        text: 'hi',
        classList: { add: jest.fn(), remove: jest.fn(), toggle: jest.fn() }
      })
    }

    jest.spyOn(view, view.onButtonClick.name).mockResolvedValue()

    jest.useFakeTimers()

    await view.onCommandClick(button)

    jest.advanceTimersByTime(view.DISABLE_BUTTON_TIMEOUT)

    expect(button.srcElement.classList.toggle).toHaveBeenCalledWith('active')
    expect(button.srcElement.classList.toggle).toHaveBeenCalledTimes(2)
    expect(view.onButtonClick).toHaveBeenCalledWith('hi')
  })

  test('#onStopButton', () => {
    const view = new View()
    const text = 'stop'

    const button = {
      srcElement: TestUtil.makeButtonElement({
        text
      })
    }

    jest.spyOn(view, view.toggleStartButton.name).mockReturnValue()
    jest.spyOn(view, view.changeCommandButtonsVisibility.name).mockReturnValue()
    jest.spyOn(view, view.onButtonClick.name).mockReturnValue()

    view.onStopButton(button)

    expect(view.toggleStartButton).toHaveBeenCalledWith(false)
    expect(view.changeCommandButtonsVisibility).toHaveBeenCalledWith(true)
    expect(view.onButtonClick).toHaveBeenCalledWith(text)
  })

  test('#isNotUnassigedButton - should return true if element is not ignored', () => {
    const view = new View()
    const button = TestUtil.makeButtonElement({
      classList: TestUtil.makeClassListElement({ classes: ['abc'] })
    })

    const result = view.isNotUnassigedButton(button)

    expect(result).toBe(true)
  })

  test('#isNotUnassigedButton - should return false if element is to be ignored', () => {
    const view = new View()
    const button = TestUtil.makeButtonElement({
      classList: TestUtil.makeClassListElement({ classes: ['unassigned'] })
    })

    const result = view.isNotUnassigedButton(button)

    expect(result).toBe(false)
  })

  test('#toggleStartButton', () => {
    const view = new View()

    view.toggleStartButton()

    expect(view.buttonStart.classList.add).toHaveBeenCalledWith('hidden')
    expect(view.buttonStart.classList.remove).toHaveBeenCalledWith('hidden')

    view.toggleStartButton(false)

    expect(view.buttonStart.classList.remove).toHaveBeenCalledWith('hidden')
    expect(view.buttonStart.classList.add).toHaveBeenCalledWith('hidden')
  })
})
