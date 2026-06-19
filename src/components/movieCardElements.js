import { apiConfig } from "../api/apiConfig";

/**
 * 
 * @param {*} imageUrl 
 * @returns Element img movie
 */
export function createMoviePoster(imageUrl, movieId, inDetails = false) {
    const movieImgElement = document.createElement('img')

    let initPosterPath = `${apiConfig.posterBaseUrl}${imageUrl}`
    if (imageUrl == null) initPosterPath = '/no_cover.png'
    movieImgElement.setAttribute('src', initPosterPath);
    if (!inDetails) movieImgElement.setAttribute('data-movie-id', movieId)
    movieImgElement.classList = 'movie-poster'
    return movieImgElement
}

/**
 * 
 * @param {*} title 
 * @returns Element h3 with title
 */
export function createMovieTitle(title) {
    const movieTitleElement = document.createElement('h4')
    movieTitleElement.textContent = title
    movieTitleElement.classList = 'movie-title'
    return movieTitleElement
}

export function createMovieData(rating, date) {
    const movieInfoElement = document.createElement('p')
    movieInfoElement.classList = 'movie-data'
    movieInfoElement.textContent = `Valoración: ${(rating).toFixed(1)} | Año: ${new Date(date).getFullYear()}`
    return movieInfoElement
}

/**
 * 
 * @param {*} description 
 * @returns Element p with description 
 */
export function createMovieOverview(overview, inDetails) {

    const movieOverviewContainer = document.createElement('div')
    movieOverviewContainer.classList = 'movie-overview-container'

    if (inDetails) {
        
        const movieTitleOverviewElement = document.createElement('p')
        movieTitleOverviewElement.classList = 'movie-overview-title'
        movieTitleOverviewElement.textContent = 'Sinopsis:'
        movieOverviewContainer.appendChild(movieTitleOverviewElement)
    }
    const movieOverviewPElement = document.createElement('p')
    movieOverviewPElement.textContent = overview !== '' ? overview : 'No hay información disponible'
    movieOverviewPElement.classList = 'movie-overview'

    movieOverviewContainer.appendChild(movieOverviewPElement)

    return movieOverviewContainer
}