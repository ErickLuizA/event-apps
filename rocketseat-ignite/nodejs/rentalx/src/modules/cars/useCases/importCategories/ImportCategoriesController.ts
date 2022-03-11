import { Request, Response } from 'express'
import { ImportCategoriesUseCase } from '@/modules/cars/useCases/importCategories/ImportCategoriesUseCase'

export class ImportCategoriesController {
  constructor(
    private readonly importCategoriesUseCase: ImportCategoriesUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    const { file } = request

    this.importCategoriesUseCase.execute(file!)

    return response.send()
  }
}
