import { applicationStatus } from "../api/apiConfig"

// 0. Entry point
export const containerDomElement: HTMLElement | null = document.querySelector('#app')

export function setViewElementsToolbar(whereAmI: string): void {

    const viewGridButton = document.querySelector<HTMLElement>('.grid-view')
    const viewListButton = document.querySelector<HTMLElement>('.list-view')
    const backToMainButton = document.querySelector<HTMLElement>('.back-main')
    const selectListTypeMovies = document.querySelector<HTMLElement>('.movies-categories')
    switch (whereAmI) {
        case 'details':
            setVisibility(viewGridButton, false)
            setVisibility(viewListButton, false)
            setVisibility(selectListTypeMovies, false)
            setVisibility(backToMainButton)
            break;
        default:
        case 'main':
            setVisibility(viewGridButton)
            setVisibility(viewListButton)
            setVisibility(selectListTypeMovies)
            setVisibility(backToMainButton, false)
            break;
    }

}

export function createMovieListContainer(): HTMLDivElement {
    // Element container for list movies
    const moviesContainerElement = document.createElement('div')
    moviesContainerElement.id = 'movie-list-container'
    return moviesContainerElement
}

export function setDefaultSelectedListMovie(elementDom: string): void {

    const selectElement = document.querySelector<HTMLSelectElement>(elementDom);

    if (selectElement) selectElement.value = applicationStatus.movieListing;

}

export function setVisibility(domElement: HTMLElement | null, visible: boolean = true): void {

    // Catch null possibility for domElement
    if (!domElement) return
    visible ? domElement.removeAttribute('hidden') : domElement.setAttribute('hidden', 'true')
}

export function clearSearchInput(): void {
    
    const inputElement = document.querySelector<HTMLInputElement>("#search-movie-input")
    if (inputElement) {
        inputElement.style.border = 'none'
        inputElement.placeholder = 'Buscar pelicula'
    }
}