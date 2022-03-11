import { InMemorySpecificationsRepository } from '@/modules/cars/repositories/implementations/InMemorySpecificationsRepository'
import { CreateSpecificationController } from '@/modules/cars/useCases/createSpecification/CreateSpecificationController'
import { CreateSpecificationUseCase } from '@/modules/cars/useCases/createSpecification/CreateSpecificationUseCase'

const specificationsRepository = InMemorySpecificationsRepository.instance

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
)

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
)

export { createSpecificationController }
