interface Episodio {
    episodioId: number
    episodioNumero: number
    episodioUrl: string
    episodioTipo: string
}

export default interface AnimeTypes {
    id: number
    nome: string
    ano: number
    genero: string
    urlCapa: string
    urlTrailer: string
    sinopse: string
    classificacaoIndicativa: number
    episodios: Episodio[]
}
