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
      result: 'ok'
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

    return this.service.startStreamming()
  }

  createClientStream() {
    const { id, clientStream } = this.service.createClientStream()

    logger.info(`Created connection of ${id}`)

    const onClose = () => {
      logger.info(`Closing connection of ${id}`)
      this.service.removeClientStream(id)
    }

    return {
      stream: clientStream,
      onClose
    }
  }
}