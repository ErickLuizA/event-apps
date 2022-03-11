import path, { dirname } from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    migrations: {
      directory: path.join(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'database', 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    migrations: {
      directory: path.join(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'database', 'seeds')
    }
  }
}
