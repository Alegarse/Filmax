import { getMovieListData, searchMovieByName } from "../api/api"
import { applicationStatus } from "../api/apiConfig"
import type { MovieObject, MovieObjectsArray } from "../interfaces/interfaces"
import { containerDomElement } from "../utils/dom"
import { addMovieListContainer } from "./movieListElement"

export function resetNavigationTool(): void {
    applicationStatus.actualPage = 1
    const actualPageElement = document.querySelector<HTMLElement>('.actual-page')
    const previousPageButton = document.querySelector<HTMLButtonElement>('.previous-page')
    const nextPageButton = document.querySelector<HTMLButtonElement>('.next-page')
    if (actualPageElement) actualPageElement.textContent = applicationStatus.actualPage.toString()
    if (previousPageButton) previousPageButton.setAttribute('disabled', "true")
    if (nextPageButton) nextPageButton.removeAttribute('disabled')
}

export function uniqueResultsPage(): void {
    applicationStatus.actualPage = 1
    const actualPage = document.querySelector('.actual-page');
    const previousPage = document.querySelector('.previous-page');
    const nextPage = document.querySelector('.next-page');
    if (actualPage) actualPage.textContent = applicationStatus.actualPage.toString()
    if (previousPage) previousPage.setAttribute('disabled', "true")
    if (nextPage) nextPage.setAttribute('disabled', "true")
}

function createElementButton(role: string): HTMLButtonElement {
    const element: HTMLButtonElement = document.createElement('button')
    switch (role) {
        case 'back':
            element.classList = 'pagination-arrow previous-page'
            element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"><path d="M11 17h6l-4 -5l4 -5h-6l-4 5z"/></svg>'
            element.disabled = true
            break
        case 'next':
            element.classList = 'pagination-arrow next-page'
            element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2" pointer-events="none"><path d="M13 7h-6l4 5l-4 5h6l4 -5z"/></svg> '
            break
        case 'actual':
            element.classList = 'actual-page'
            element.textContent = '1'
            element.disabled = true
            break
    }
    return element
}

export function createPaginationTool(): void {

    const paginationElement: HTMLDivElement = document.createElement('div')
    paginationElement.classList = 'pagination-tool'

    const backSelectorElement = createElementButton('back')
    const actualPageElement = createElementButton('actual')
    const advanceSelectorElement = createElementButton('next')

    paginationElement.appendChild(backSelectorElement)
    paginationElement.appendChild(actualPageElement)
    paginationElement.appendChild(advanceSelectorElement)

    if (containerDomElement) containerDomElement.appendChild(paginationElement)

}

function noMoreResults() {
    const nextPage = document.querySelector('.next-page')
    if (nextPage) nextPage.setAttribute('disabled', "true")
}

export async function changeDataMoviesFromPagination(): Promise<void> {

    const attachedElement = document.querySelector<HTMLDivElement>('#movie-list-container')
    if (attachedElement) {
        attachedElement.innerHTML = ''
        

        let dataFromApi
        if (!applicationStatus.inSearchedMovie) {
            dataFromApi = await getMovieListData()
        } else {
            dataFromApi = await searchMovieByName(applicationStatus.movieSearched)
        }
        if (dataFromApi) {
            const movieDataPaginated = dataFromApi?.results
            const resultsNumber = movieDataPaginated.length
            if (resultsNumber < 20) noMoreResults()
            addMovieListContainer(movieDataPaginated, applicationStatus.viewType, false)
        }

    }


}