import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

// eslint-disable-next-line
import routes from './routes.js' 

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routes)

app.use((_, __, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, _, res, __) => {
  res.status(error.status ?? 500)
  res.json({ error: error.message })
})

const port = process.env.PORT ?? 3333

app.listen(port, () => console.log('Server running at port', port))
