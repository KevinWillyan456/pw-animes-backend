import express from 'express'
import AnimeController from '../controllers/AnimeController'

export const routes = express.Router()

routes.get('/animes', AnimeController.getAll)
routes.get('/animes/:id', AnimeController.getById)
routes.post('/animes', AnimeController.create)
routes.put('/animes/:id', AnimeController.update)
routes.delete('/animes/:id', AnimeController.delete)

routes.get('/animes/:id/episodios', AnimeController.getAllEpisodes)
routes.get('/animes/:id/:episodioId', AnimeController.getEpisodeById)
routes.post('/animes/:id/episodios', AnimeController.createEpisode)
routes.put('/animes/:id/:episodioId', AnimeController.updateEpisode)
routes.delete('/animes/:id/:episodioId', AnimeController.deleteEpisode)
routes.delete(
    '/animes-delete-all-episodes/:id',
    AnimeController.deleteAllEpisodes,
)
