import express from 'express'
import swaggerUi from 'swagger-ui-express'

import routes from '@/routes'
import swaggerFile from '@/swagger.json'

const app = express()

app.use(express.json())

routes(app)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(3333, () =>
  console.log('Server is running at http://localhost:3333 🔥🔥')
)
