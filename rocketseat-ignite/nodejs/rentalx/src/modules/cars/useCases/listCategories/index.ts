import { InMemoryCategoriesRepository } from '@/modules/cars/repositories/implementations/InMemoryCategoriesRepository'
import { ListCategoriesController } from '@/modules/cars/useCases/listCategories/ListCategoriesController'
import { ListCategoriesUseCase } from '@/modules/cars/useCases/listCategories/ListCategoriesUseCase'

const categoriesRepository = InMemoryCategoriesRepository.instance
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
)

export { listCategoriesController }
