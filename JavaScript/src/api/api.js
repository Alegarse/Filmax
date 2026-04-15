import axios from 'axios';
import { apiConfig, defaultInit,applicationStatus } from './apiConfig';

export async function getMovieListData(listType = applicationStatus.movieListing, pageSelected = applicationStatus.actualPage) {
    try {
        let movieListUrl = apiConfig.baseUrl
        movieListUrl += `movie/${listType}`
        movieListUrl += `?api_key=${apiConfig.apiKey}`
        movieListUrl += `&language=${apiConfig.langIso}`
        movieListUrl += `&page=${pageSelected}`
        return (await axios(movieListUrl))?.data
    } catch(error) {
        console.error(error.message)
    }
}

export async function getMovieDetailsData(movieId) {
    try {
        let movieDetailUrl = apiConfig.baseUrl
        movieDetailUrl += `movie/${movieId}`
        movieDetailUrl += `?api_key=${apiConfig.apiKey}`
        movieDetailUrl += `&language=${apiConfig.langIso}`
        movieDetailUrl += `&append_to_response=credits`
        return (await axios(movieDetailUrl))?.data
    } catch (error) {
        console.error(error.message)
    }
}


export async function searchMovieId(movieTitle, pageSelected = applicationStatus.actualPage) {
    try {
        let movieSearchUrl = apiConfig.baseUrl
        movieSearchUrl += `search/movie?query=${movieTitle}`
        movieSearchUrl += `&api_key=${apiConfig.apiKey}`
        movieSearchUrl += `&language=${apiConfig.langIso}`
        movieSearchUrl += `&page=${pageSelected}`
        return (await axios(movieSearchUrl))?.data
    } catch (error) {
        console.error(error.message)
    }
}