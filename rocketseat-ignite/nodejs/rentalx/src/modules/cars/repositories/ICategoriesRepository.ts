import { Category } from '@/modules/cars/entities/Category'

export interface ICreateCategoryDTO {
  name: string
  description: string
}

export interface IImportCategory {
  name: string
  description: string
}

export interface ICategoriesRepository {
  create: (dto: ICreateCategoryDTO) => Category

  index: () => Category[]

  findByName: (name: string) => Category
}
