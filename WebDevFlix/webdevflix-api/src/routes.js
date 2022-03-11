import express from 'express'

import EpisodeController from './controllers/EpisodeController.js'
import CategoryController from './controllers/CategoryController.js'

const router = express.Router()

const episodeController = new EpisodeController()
const categoryController = new CategoryController()

router.get('/episodes', episodeController.index)

router.post('/newepisode', episodeController.create)

router.get('/categories', categoryController.index)

export default router
