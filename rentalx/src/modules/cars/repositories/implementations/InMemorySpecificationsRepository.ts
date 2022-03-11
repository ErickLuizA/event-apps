import { Specification } from '@/modules/cars/entities/Specification'
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@/modules/cars/repositories/ISpecificationsRepository'

export class InMemorySpecificationsRepository
  implements ISpecificationsRepository
{
  private specifications: Specification[]

  private static INSTANCE: InMemorySpecificationsRepository

  private constructor() {
    this.specifications = []
  }

  public static get instance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new InMemorySpecificationsRepository()
    }

    return this.INSTANCE
  }

  create({ name, description }: ICreateSpecificationDTO) {
    const specification = new Specification(name, description)

    this.specifications.push(specification)

    return specification
  }

  index() {
    return this.specifications
  }

  findByName(name: string) {
    return this.specifications.find((value) => value.name === name)!
  }
}
