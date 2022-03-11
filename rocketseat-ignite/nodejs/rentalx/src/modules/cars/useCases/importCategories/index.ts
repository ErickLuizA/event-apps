import { InMemoryCategoriesRepository } from '@/modules/cars/repositories/implementations/InMemoryCategoriesRepository'
import { ImportCategoriesController } from '@/modules/cars/useCases/importCategories/ImportCategoriesController'
import { ImportCategoriesUseCase } from '@/modules/cars/useCases/importCategories/ImportCategoriesUseCase'

const categoriesRepository = InMemoryCategoriesRepository.instance

const importCategoriesUseCase = new ImportCategoriesUseCase(
  categoriesRepository
)

const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase
)

export { importCategoriesController }
