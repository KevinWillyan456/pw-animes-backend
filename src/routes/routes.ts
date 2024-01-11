import express from 'express'
import AnimeController from '../controllers/AnimeController'

export const routes = express.Router()

routes.get('/animes', AnimeController.getAll)
routes.get('/animes/:id', AnimeController.getById)
routes.post('/animes', AnimeController.create)
routes.put('/animes/:id', AnimeController.update)
routes.delete('/animes/:id', AnimeController.delete)
