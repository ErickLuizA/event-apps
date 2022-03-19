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
      .mockReturnValue(TestUtil.makeButtonEelement())
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
    const button = TestUtil.makeButtonEelement()

    jest.spyOn(document, 'querySelectorAll').mockReturnValue([button])

    view.changeCommandButtonsVisibility()

    expect(button.classList.add).toHaveBeenCalledWith('unassigned')
    expect(button.onclick.name).toStrictEqual('onClickReset')

    expect(() => button.onclick()).not.toThrow()
  })

  test('#changeCommandButtonsVisibility - given hide=false it should remove unassigned class and reset onclick', () => {
    const view = new View()
    const button = TestUtil.makeButtonEelement()

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

    jest.spyOn(view, view.onButtonClick.name)
    jest.spyOn(view, view.changeCommandButtonsVisibility.name).mockReturnValue()
    jest.spyOn(view, view.toggleStartButton.name).mockReturnValue()

    const args = { srcElement: { innerText: 'hello world' } }

    await view.onStartClicked(args)

    expect(view.onButtonClick).toHaveBeenCalledWith(args.srcElement.innerText)
    expect(view.changeCommandButtonsVisibility).toHaveBeenCalledWith(false)
    expect(view.toggleStartButton).toHaveBeenCalledWith(true)
  })
})
