import { InMemoryCategoriesRepository } from '@/modules/cars/repositories/implementations/InMemoryCategoriesRepository'
import { CreateCategoryController } from '@/modules/cars/useCases/createCategory/CreateCategoryController'
import { CreateCategoryUseCase } from '@/modules/cars/useCases/createCategory/CreateCategoryUseCase'

const categoriesRepository = InMemoryCategoriesRepository.instance

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
)

export { createCategoryController }
