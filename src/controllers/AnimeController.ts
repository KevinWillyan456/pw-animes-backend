import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import AnimeModel from '../models/Anime'

export default class AnimeController {
    public static async getAll(req: Request, res: Response) {
        try {
            const animes = await AnimeModel.find()
                .sort({ nome: 1 })
                .collation({ locale: 'pt', strength: 2 })

            animes.forEach((anime) => {
                anime.episodios.sort((a, b) => {
                    if (a.episodioNumero > b.episodioNumero) return 1
                    if (a.episodioNumero < b.episodioNumero) return -1
                    return 0
                })
            })

            res.status(200).json(animes)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const anime = await AnimeModel.findById(req.params.id)

            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            anime.episodios.sort((a, b) => {
                if (a.episodioNumero > b.episodioNumero) return 1
                if (a.episodioNumero < b.episodioNumero) return -1
                return 0
            })

            res.status(200).json(anime)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const {
                nome,
                ano,
                genero,
                urlCapa,
                urlTrailer,
                sinopse,
                classificacaoIndicativa,
            } = req.body

            if (
                !nome ||
                !ano ||
                !genero ||
                !urlCapa ||
                !urlTrailer ||
                !sinopse ||
                !classificacaoIndicativa
            ) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' })
            }

            const anime = new AnimeModel({
                _id: uuid(),
                nome,
                ano,
                genero,
                urlCapa,
                urlTrailer,
                sinopse,
                classificacaoIndicativa,
                dataCriacao: Date.now(),
            })

            await AnimeModel.create(anime)
            res.status(201).json({ message: 'Anime created successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const {
                nome,
                ano,
                genero,
                urlCapa,
                urlTrailer,
                sinopse,
                classificacaoIndicativa,
            } = req.body

            if (
                !nome &&
                !ano &&
                !genero &&
                !urlCapa &&
                !urlTrailer &&
                !sinopse &&
                !classificacaoIndicativa
            ) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' })
            }

            const anime = await AnimeModel.findById(req.params.id)
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            const entries = {
                nome,
                ano,
                genero,
                urlCapa,
                urlTrailer,
                sinopse,
                classificacaoIndicativa,
            }

            await AnimeModel.findByIdAndUpdate(req.params.id, entries, {
                new: true,
            })
            res.status(200).json({ message: 'Anime updated successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const anime = await AnimeModel.findById(req.params.id)

            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }
            await AnimeModel.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'Anime deleted successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async getEpisodeById(req: Request, res: Response) {
        try {
            const anime = await AnimeModel.findById(req.params.id)
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            const episode = anime.episodios.find(
                (episode) => episode._id === req.params.episodioId,
            )
            if (!episode) {
                return res.status(404).json({ message: 'Episode not found' })
            }

            res.status(200).json(episode)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async createEpisode(req: Request, res: Response) {
        try {
            const {
                episodioNumero,
                episodioUrl,
                episodioTipo = 'normal',
            } = req.body

            if (!episodioNumero || !episodioUrl) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' })
            }

            const anime = await AnimeModel.findById(req.params.id)
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            const episode = anime.episodios.find(
                (episode) => episode.episodioNumero === episodioNumero,
            )
            if (episode) {
                return res
                    .status(400)
                    .json({ message: 'Episode already exists' })
            }

            anime.episodios.push({
                _id: uuid(),
                episodioNumero,
                episodioUrl,
                episodioTipo,
            })

            await AnimeModel.findByIdAndUpdate(req.params.id, anime, {
                new: true,
            })
            res.status(201).json({ message: 'Episode created successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async updateEpisode(req: Request, res: Response) {
        try {
            const { episodioNumero, episodioUrl, episodioTipo } = req.body

            if (!episodioNumero && !episodioUrl && !episodioTipo) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' })
            }

            const anime = await AnimeModel.findById(req.params.id)
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            const episodeExists = anime.episodios.find(
                (episode) =>
                    episode.episodioNumero === episodioNumero &&
                    episode._id !== req.params.episodioId,
            )
            if (episodeExists) {
                return res
                    .status(400)
                    .json({ message: 'Episode already exists' })
            }

            const episode = anime.episodios.find(
                (episode) => episode._id === req.params.episodioId,
            )
            if (!episode) {
                return res.status(404).json({ message: 'Episode not found' })
            }

            const entries = {
                _id: req.params.episodioId,
                episodioNumero: episodioNumero || episode.episodioNumero,
                episodioUrl: episodioUrl || episode.episodioUrl,
                episodioTipo: episodioTipo || episode.episodioTipo,
            }

            await AnimeModel.findOneAndUpdate(
                { _id: req.params.id, 'episodios._id': req.params.episodioId },
                { $set: { 'episodios.$': entries } },
                { new: true },
            )
            res.status(200).json({ message: 'Episode updated successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async deleteEpisode(req: Request, res: Response) {
        try {
            const anime = await AnimeModel.findById(req.params.id)
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            const episode = anime.episodios.find(
                (episode) => episode._id === req.params.episodioId,
            )
            if (!episode) {
                return res.status(404).json({ message: 'Episode not found' })
            }

            await AnimeModel.findByIdAndUpdate(req.params.id, {
                $pull: { episodios: { _id: req.params.episodioId } },
            })
            res.status(200).json({ message: 'Episode deleted successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async deleteAllEpisodes(req: Request, res: Response) {
        try {
            const anime = await AnimeModel.findById(req.params.id)
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            await AnimeModel.findByIdAndUpdate(req.params.id, {
                $set: { episodios: [] },
            })
            res.status(200).json({ message: 'Episodes deleted successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async getAllEpisodes(req: Request, res: Response) {
        try {
            const anime = await AnimeModel.findById(req.params.id)
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found' })
            }

            const episodes = anime.episodios.sort((a, b) => {
                if (a.episodioNumero > b.episodioNumero) return 1
                if (a.episodioNumero < b.episodioNumero) return -1
                return 0
            })
            res.status(200).json(episodes)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
