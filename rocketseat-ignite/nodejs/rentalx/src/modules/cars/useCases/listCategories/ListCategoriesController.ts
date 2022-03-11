import { Request, Response } from 'express'
import { ListCategoriesUseCase } from '@/modules/cars/useCases/listCategories/ListCategoriesUseCase'

export class ListCategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoriesUseCase.execute()

    return response.status(200).json(categories)
  }
}
