import db from '../database/connection.js'

export default class EpisodeController {
  async index (_, res, next) {
    try {
      const response = await db('episodes')

      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  async create (req, res, next) {
    const { title, link, category, description } = req.body

    try {
      const exist = await db('categories').where({ title: category })

      if (exist.length === 0) {
        await db('categories').insert([
          { title: category }
        ])
      }

      await db('episodes').insert({
        title,
        link,
        category,
        description
      })

      return res.status(201).send('Episode added')
    } catch (error) {
      next(error)
    }
  }
}
