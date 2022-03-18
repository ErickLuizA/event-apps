import server from './server.js'
import config from './utils/config.js'
import { logger } from './utils/logger.js'

server()
  .listen(config.port)
  .on('listening', () => {
    logger.info(`Server is running at http://localhost:${config.port} 🚀🚀🚀🚀`)
  })
