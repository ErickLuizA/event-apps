import { Category } from '@/modules/cars/entities/Category'
import { ICategoriesRepository } from '@/modules/cars/repositories/ICategoriesRepository'

export class ListCategoriesUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.index()
  }
}
