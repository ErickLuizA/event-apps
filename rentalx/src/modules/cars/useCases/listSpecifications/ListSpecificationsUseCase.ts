import { Category } from '@/modules/cars/entities/Category'
import { ISpecificationsRepository } from '@/modules/cars/repositories/ISpecificationsRepository'

export class ListSpecificationsUseCase {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  execute(): Category[] {
    return this.specificationsRepository.index()
  }
}
