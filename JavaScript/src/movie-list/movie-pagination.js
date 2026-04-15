import { containerDomElement } from "../util/dom"
import { getMovieListData } from "../api/api"
import { addMovieListContainer } from "./movie-list"
import { applicationStatus } from "../api/apiConfig"
import { searchMovieId } from "../api/api"

export function resetNavigationTool() {
    applicationStatus.actualPage = 1
    document.querySelector('.actual-page').textContent = applicationStatus.actualPage
    document.querySelector('.previous-page').setAttribute('disabled', true)
    document.querySelector('.next-page').removeAttribute('disabled')
}

export function uniqueResultsPage() {
    applicationStatus.actualPage = 1
    document.querySelector('.actual-page').textContent = applicationStatus.actualPage
    document.querySelector('.previous-page').setAttribute('disabled', true)
    document.querySelector('.next-page').setAttribute('disabled', true)
}

function noMoreResults() {
    document.querySelector('.next-page').setAttribute('disabled', true)
}

function createElementButton(role) {
    const element = document.createElement('button')
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

export function createPaginationTool() {

    const paginationElement = document.createElement('div')
    paginationElement.classList = 'pagination-tool'

    const backSelectorElement = createElementButton('back')
    const actualPageElement = createElementButton('actual')
    const advanceSelectorElement = createElementButton('next')

    paginationElement.appendChild(backSelectorElement)
    paginationElement.appendChild(actualPageElement)
    paginationElement.appendChild(advanceSelectorElement)

    containerDomElement.appendChild(paginationElement)

}

export async function changeDataMoviesFromPagination() {

    const attachedElement = document.querySelector('#movie-list-container')
    attachedElement.innerHTML = ''

    let dataFromApi
    if (applicationStatus.inSearchedMovie === false) {
        dataFromApi = await getMovieListData()
    } else {
        dataFromApi = await searchMovieId(applicationStatus.movieSearched)
    }
    const { results: movieDataPaginated } = dataFromApi
    const resultsNumber = movieDataPaginated.length
    if (resultsNumber < 20) noMoreResults()
    addMovieListContainer(movieDataPaginated, applicationStatus.viewType, false)

}