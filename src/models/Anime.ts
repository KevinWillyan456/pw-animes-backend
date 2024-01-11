import mongoose, { Document, Schema } from 'mongoose'

interface Episodio {
    _id: string
    episodioNumero: number
    episodioUrl: string
    episodioTipo: string
}

interface Anime extends Document {
    _id: string
    nome: string
    ano: number
    genero: string
    urlCapa: string
    urlTrailer: string
    sinopse: string
    classificacaoIndicativa: number
    episodios: Episodio[]
}

const episodioSchema = new Schema<Episodio>({
    _id: { type: String, required: true },
    episodioNumero: { type: Number, required: true },
    episodioUrl: { type: String, required: true },
    episodioTipo: { type: String, required: true, default: 'normal' },
})

const animeSchema = new Schema<Anime>({
    _id: { type: String, required: true },
    nome: { type: String, required: true, unique: true },
    ano: { type: Number, required: true },
    genero: { type: String, required: true },
    urlCapa: { type: String, required: true },
    urlTrailer: { type: String, required: true },
    sinopse: { type: String, required: true },
    classificacaoIndicativa: { type: Number, required: true },
    episodios: { type: [episodioSchema], required: false },
})

const AnimeModel = mongoose.model<Anime>('Anime', animeSchema)

export default AnimeModel
