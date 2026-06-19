import { searchMovieId } from "../api/api"
import { applicationStatus, emptySearchText } from "../api/apiConfig"
import { addMovieListContainer } from "../movie-list/movie-list"
import { addMovieEmptyListContainer } from "../movie-list/movie-list"
import { setViewElementsToolbar } from "../util/dom"
import { resetNavigationTool, uniqueResultsPage } from "../movie-list/movie-pagination"

export function createFormMovieListener(formId, inputId) {

    const formElement = document.querySelector(formId)
    const inputElement = document.querySelector(inputId)

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const movieToSearch = inputElement.value
        if (inputElement.value === '') {
            inputElement.style.border = '2px solid red'
            inputElement.placeholder = 'Nombre necesario'
            return
        }
        inputElement.placeholder = 'Buscar pelicula'
        inputElement.style.border = 'none' 
        searchMovieBytitle(movieToSearch)
        inputElement.value = ''
    })

}

async function searchMovieBytitle(movieTitle) {

    resetNavigationTool()

    const { results: dataMovieSearched } = await searchMovieId(movieTitle)

    const resultsNumber = dataMovieSearched.length
    applicationStatus.movieSearched = movieTitle

    let attachedElement = document.querySelector('#movie-list-container')
    attachedElement.innerHTML = ''
    setViewElementsToolbar('main')

    if (resultsNumber === 0) {
        // Dont clear -> applicationStatus.movieDataArray = undefined
        // Maybe at details Page and need a data to return to Main Page
        attachedElement.appendChild(addMovieEmptyListContainer(emptySearchText.no_records))
    } else {
        if (resultsNumber < 20) uniqueResultsPage()
        applicationStatus.movieDataArray = dataMovieSearched
        applicationStatus.inSearchedMovie = true
        addMovieListContainer(dataMovieSearched, applicationStatus.viewType, false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
}