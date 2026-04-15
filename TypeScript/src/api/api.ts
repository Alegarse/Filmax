import axios from "axios"
import { apiConfig, applicationStatus } from "./apiConfig"
import type { MovieObject, MovieObjectsArray } from "../interfaces/interfaces"

export async function getMovieListData(listType: string = applicationStatus.movieListing, pageSelected: number = applicationStatus.actualPage): Promise<MovieObjectsArray | null> {
    try {
        let movieListUrl: string = apiConfig.baseUrl
        movieListUrl += `movie/${listType}`
        movieListUrl += `?api_key=${apiConfig.apiKey}`
        movieListUrl += `&language=${apiConfig.langIso}`
        movieListUrl += `&page=${pageSelected}`
        return (await axios<MovieObjectsArray>(movieListUrl))?.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
        } else {
            console.error("Unexpected error:", error)
        }
        return null
    }
}

export async function getMovieDetailsData(movieId: string) : Promise<MovieObject | null> {
    try {
        let movieDetailUrl: string = apiConfig.baseUrl
        movieDetailUrl += `movie/${movieId}`
        movieDetailUrl += `?api_key=${apiConfig.apiKey}`
        movieDetailUrl += `&language=${apiConfig.langIso}`
        movieDetailUrl += `&append_to_response=credits`
        return (await axios<MovieObject>(movieDetailUrl))?.data
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
        } else {
            console.error("Unexpected error:", error)
        }
        return null
    }
}

export async function searchMovieByName(movieTitle: string, pageSelected: number = applicationStatus.actualPage): Promise<MovieObjectsArray| null> {
    try {
        let movieSearchUrl: string = apiConfig.baseUrl
        movieSearchUrl += `search/movie?query=${movieTitle}`
        movieSearchUrl += `&api_key=${apiConfig.apiKey}`
        movieSearchUrl += `&language=${apiConfig.langIso}`
        movieSearchUrl += `&page=${pageSelected}`
        return (await axios<MovieObjectsArray>(movieSearchUrl)).data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
        } else {
            console.error("Unexpected error:", error)
        }
        return null
    }
}