import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@/modules/cars/repositories/ISpecificationsRepository'

/**
 * Create Specification if it does not already exists, otherwise throw Error.
 */
export class CreateSpecificationUseCase {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  execute({ name, description }: ICreateSpecificationDTO) {
    const alreadyExists = this.specificationsRepository.findByName(name)

    if (alreadyExists) {
      throw new Error('This specification already exists')
    }

    return this.specificationsRepository.create({ name, description })
  }
}
