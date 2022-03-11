import db from '../database/connection.js'

export default class CategoryController {
  async index (_, res, next) {
    try {
      const response = await db('categories')

      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
