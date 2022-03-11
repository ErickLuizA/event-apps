import { Router } from 'express'
import { createSpecificationController } from '@/modules/cars/useCases/createSpecification'
import { listSpecificationsController } from '@/modules/cars/useCases/listSpecifications'

export default (router: Router) => {
  router.post('/specifications', (request, response) =>
    createSpecificationController.handle(request, response)
  )

  router.get('/specifications', (request, response) =>
    listSpecificationsController.handle(request, response)
  )
}
