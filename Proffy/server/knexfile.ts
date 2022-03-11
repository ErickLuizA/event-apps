// Update with your config settings.
import dotenv from 'dotenv'

dotenv.config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: `${ __dirname }/src/database/migrations`
    },
    seeds: {
      directory: `${ __dirname }/src/database/seeds`
    }
  },    

}
