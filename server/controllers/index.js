import { Service } from '../services/index.js'
import { logger } from '../utils/logger.js'

export class Controller {
  constructor() {
    this.service = new Service()
  }

  async getFileStream(filename) {
    return this.service.getFileStream(filename)
  }

  async handleCommand({ command }) {
    logger.info(`Command received: ${command}`)

    const result = {
      result: 'ok',
      command: command
    }

    const cmd = command.toLowerCase()

    if (cmd.includes('start')) {
      this.service.startStreamming()

      return result
    }

    if (cmd.includes('stop')) {
      this.service.stopStreamming()

      return result
    }

    throw Error('Unsupported command')
  }

  createClientStream() {
    const { id, clientStream } = this.service.createClientStream()

    logger.info(`${id} has connected`)

    const onClose = () => {
      logger.info(`${id} has been disconnected`)

      this.service.removeClientStream(id)
    }

    return {
      stream: clientStream,
      onClose
    }
  }
}