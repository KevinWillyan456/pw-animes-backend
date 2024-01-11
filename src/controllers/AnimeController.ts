import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import AnimeModel from '../models/Anime'

export default class AnimeController {
    public static async getAll(req: Request, res: Response) {
        try {
            const animes = await AnimeModel.find()
            res.status(200).json(animes)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const anime = await AnimeModel.findById(req.params.id)
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
}
