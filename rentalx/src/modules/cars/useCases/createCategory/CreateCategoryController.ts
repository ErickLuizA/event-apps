import { Request, Response } from 'express'
import { CreateCategoryUseCase } from '@/modules/cars/useCases/createCategory/CreateCategoryUseCase'

export class CreateCategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    const category = this.createCategoryUseCase.execute({
      name,
      description,
    })

    return response.status(201).json(category)
  }
}
