import { Specification } from '@/modules/cars/entities/Specification'

export interface ICreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create: (dto: ICreateSpecificationDTO) => Specification

  index: () => Specification[]

  findByName: (name: string) => Specification
}
