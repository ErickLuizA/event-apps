import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express) => {
  const router = Router()

  app.use('/api', router)

  readdirSync(path.join(__dirname, '.', 'modules')).map(async (module) => {
    const moduleRoutes = path.join(__dirname, '.', 'modules', module, 'routes')

    readdirSync(moduleRoutes).map(async (route) => {
      const importedRoute = await import(
        path.join(__dirname, '.', 'modules', module, 'routes', route)
      )

      importedRoute.default(router)
    })
  })
}
