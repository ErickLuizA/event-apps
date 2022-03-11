import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@/modules/cars/repositories/ICategoriesRepository'

/**
 * Create category if it does not already exists, otherwise throw Error.
 */
export class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: ICreateCategoryDTO) {
    const alreadyExists = this.categoriesRepository.findByName(name)

    if (alreadyExists) {
      throw new Error('This category already exists')
    }

    return this.categoriesRepository.create({ name, description })
  }
}
