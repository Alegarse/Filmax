import { apiConfig } from "../api/apiConfig";

export function createMoviePoster(imageUrl: string, movieId: number, inDetails: boolean = false): HTMLElement {
    const movieImgElement: HTMLElement = document.createElement('img')

    let initPosterPath: string = `${apiConfig.posterBaseUrl}${imageUrl}`
    if (imageUrl == null) initPosterPath = '/no_cover.png'
    movieImgElement.setAttribute('src', initPosterPath);
    if (!inDetails) movieImgElement.setAttribute('data-movie-id', movieId.toString())
    movieImgElement.classList.add('movie-poster')
    return movieImgElement
}

export function createMovieTitle(title: string): HTMLElement {
    const movieTitleElement: HTMLElement = document.createElement('h4')
    movieTitleElement.textContent = title
    movieTitleElement.classList.add('movie-title') 
    return movieTitleElement
}

export function createMovieData(rating: number, date: string): HTMLElement {
    const movieInfoElement: HTMLElement = document.createElement('p')
    movieInfoElement.classList.add('movie-data')
    movieInfoElement.textContent = `Valoración: ${(rating).toFixed(1)} | Año: ${new Date(date).getFullYear()}`
    return movieInfoElement
}

export function createMovieOverview(overview: string, inDetails: boolean): HTMLElement {

    const movieOverviewContainer: HTMLElement = document.createElement('div')
    movieOverviewContainer.classList.add('movie-overview-container') 

    if (inDetails) {

        const movieTitleOverviewElement: HTMLElement = document.createElement('p')
        movieTitleOverviewElement.classList.add('movie-overview-title') 
        movieTitleOverviewElement.textContent = 'Sinopsis:'
        movieOverviewContainer.appendChild(movieTitleOverviewElement)
    }
    const movieOverviewPElement: HTMLElement = document.createElement('p')
    movieOverviewPElement.textContent = overview !== '' ? overview : 'No hay información disponible'
    movieOverviewPElement.classList.add('movie-overview') 

    movieOverviewContainer.appendChild(movieOverviewPElement)

    return movieOverviewContainer
}