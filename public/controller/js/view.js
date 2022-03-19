export default class View {
  constructor() {
    this.buttonStart = document.getElementById('start')
    this.buttonStop = document.getElementById('stop')

    this.buttons = () => Array.from(document.querySelectorAll('button'))

    this.ignoreButtons = new Set(['unassigned'])

    const onButtonClick = async () => {}

    this.onButtonClick = onButtonClick

    this.DISABLE_BUTTON_TIMEOUT = 500
  }

  onLoad() {
    this.changeCommandButtonsVisibility()

    this.buttonStart.onclick = this.onStartClicked.bind(this)
  }

  changeCommandButtonsVisibility(hide = true) {
    Array.from(document.querySelectorAll('[name=command]')).forEach(
      (button) => {
        const fn = hide ? 'add' : 'remove'

        button.classList[fn]('unassigned')

        function onClickReset() {}

        button.onclick = onClickReset
      }
    )
  }

  configureOnButtonClick(fn) {
    this.onButtonClick = fn
  }

  async onStartClicked({ srcElement: { innerText } }) {
    await this.onButtonClick(innerText)

    this.changeCommandButtonsVisibility(false)
    this.toggleStartButton(true)

    this.buttons()
      .filter((btn) => this.isNotUnassigedButton(btn))
      .forEach(this.setupButtonAction.bind(this))
  }

  setupButtonAction(button) {
    const text = button.innerText.toLowerCase()

    if (text.includes('start')) return

    if (text.includes('stop')) {
      return (button.onclick = this.onStopButton.bind(this))
    }

    button.onclick = this.onCommandClick.bind(this)
  }

  async onCommandClick(button) {
    const {
      srcElement: { classList, innerText }
    } = button

    classList.toggle('active')

    await this.onButtonClick(innerText)

    setTimeout(() => classList.toggle('active'), this.DISABLE_BUTTON_TIMEOUT)
  }

  onStopButton({ srcElement: { innerText } }) {
    this.toggleStartButton(false)
    this.changeCommandButtonsVisibility(true)

    return this.onButtonClick(innerText)
  }

  isNotUnassigedButton(button) {
    const classes = Array.from(button.classList)

    return !classes.find((item) => this.ignoreButtons.has(item))
  }

  toggleStartButton(active = true) {
    if (active) {
      this.buttonStart.classList.add('hidden')
      this.buttonStop.classList.remove('hidden')
    } else {
      this.buttonStart.classList.remove('hidden')
      this.buttonStop.classList.add('hidden')
    }
  }
}
