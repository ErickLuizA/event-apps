import { Category } from '@/modules/cars/entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@/modules/cars/repositories/ICategoriesRepository'

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: InMemoryCategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static get instance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new InMemoryCategoriesRepository()
    }

    return this.INSTANCE
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category = new Category(name, description)

    this.categories.push(category)

    return category
  }

  index() {
    return this.categories
  }

  findByName(name: string) {
    return this.categories.find((value) => value.name === name)!
  }
}
