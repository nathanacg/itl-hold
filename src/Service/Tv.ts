import { axiosClientTv_api } from "../Lib/Tv_api"
import { ITvSeries } from "../Types/postProps"
interface ITvSeriesResponse {
    results: ITvSeries[]
    page: number
    total_pages: number
    total_results: number
}

const KEY_API = '5fdbfd60dd787371176fc8a157844d89'

export const getBySeries = async (tv: string, size: string) => {
    try {
        const { data } = await axiosClientTv_api.get<ITvSeriesResponse>(`3/search/tv?query=${tv}&language=pt-BR&api_key=${KEY_API}`)

        const tempResponse: ITvSeries[] = []

        data.results.map(
            serie => {

                let tempUrlBackDrop = `https://image.tmdb.org/t/p/${size}${serie.backdrop_path}`
                let tempUrlPoster = `https://image.tmdb.org/t/p/${size}${serie.poster_path}`

                tempResponse.push({
                    ...serie,
                    backdrop_path: !!serie.backdrop_path ? tempUrlBackDrop : undefined,
                    poster_path: !!serie.backdrop_path ? tempUrlPoster : undefined
                })
            }
        )
        return tempResponse
    } catch (error: any) {
        console.log(error)
        return error
    }

}


export const getFindSerie = async (tv: string, size: string) => {
    try {
        const { data } = await axiosClientTv_api.get<ISerie>(`3/tv/${tv}?language=pt-BR&api_key=${KEY_API}`)

        let tempUriDrop = `https://image.tmdb.org/t/p/${size}${data.backdrop_path}`
        let tempUrlPoster = `https://image.tmdb.org/t/p/${size}${data.poster_path}`

        let tempResponse: ISerie = data

        tempResponse.backdrop_path = !!data.backdrop_path ? tempUriDrop : undefined

        tempResponse.poster_path = !!data.poster_path ? tempUrlPoster : undefined


        return {
            movieTitle: tempResponse.name,
            movieOverview: tempResponse.overview,
            movieDate: tempResponse.first_air_date,
            movieImagens: tempResponse.poster_path,
        }
    } catch (error: any) {
        console.warn("error", error)
        return error
    }

}

export const getFindSerie2 = async (tv: string, size: string) => {
    try {
        const { data } = await axiosClientTv_api.get<ISerie>(`3/tv/${tv}?language=pt-BR&api_key=${KEY_API}`)

        let tempUriDrop = `https://image.tmdb.org/t/p/${size}${data.backdrop_path}`
        let tempUrlPoster = `https://image.tmdb.org/t/p/${size}${data.poster_path}`

        let tempResponse: ISerie = data

        tempResponse.backdrop_path = !!data.backdrop_path ? tempUriDrop : undefined

        tempResponse.poster_path = !!data.poster_path ? tempUrlPoster : undefined


        return {
            movieTitle: tempResponse.name,
            movieOverview: tempResponse.overview,
            movieDate: tempResponse.first_air_date,
            movieImagens: tempResponse.poster_path,
        }
    } catch (error: any) {
        console.warn("error", error)
        return error
    }

}


export interface ISerie {
    adult: boolean
    backdrop_path?: string
    created_by: CreatedBy[]
    episode_run_time: any[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: any
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path?: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}

export interface CreatedBy {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
}

export interface Genre {
    id: number
    name: string
}

export interface LastEpisodeToAir {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
}

export interface Network {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

