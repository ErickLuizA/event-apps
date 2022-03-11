import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from '@/modules/cars/useCases/createSpecification/CreateSpecificationUseCase'

export class CreateSpecificationController {
  constructor(
    private readonly createSpecificationUseCase: CreateSpecificationUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    const specification = this.createSpecificationUseCase.execute({
      name,
      description,
    })

    return response.status(201).json(specification)
  }
}
