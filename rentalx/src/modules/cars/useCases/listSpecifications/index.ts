import { InMemorySpecificationsRepository } from '@/modules/cars/repositories/implementations/InMemorySpecificationsRepository'
import { ListSpecificationsController } from '@/modules/cars/useCases/listSpecifications/ListSpecificationsController'
import { ListSpecificationsUseCase } from '@/modules/cars/useCases/listSpecifications/ListSpecificationsUseCase'

const specificationsRepository = InMemorySpecificationsRepository.instance
const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository
)
const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase
)

export { listSpecificationsController }
