import { Express } from 'express'
import fs from 'fs'
import csvParse from 'csv-parse'
import {
  ICategoriesRepository,
  IImportCategory,
} from '@/modules/cars/repositories/ICategoriesRepository'

export class ImportCategoriesUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file)

    categories.map(async (category) => {
      const { name, description } = category

      const alreadyExists = this.categoriesRepository.findByName(name)

      if (!alreadyExists) {
        this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)

      const categories: IImportCategory[] = []

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line

          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)

          resolve(categories)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }
}
