import { searchMovieByName } from "../api/api";
import { applicationStatus, emptySearchText } from "../api/apiConfig";
import { addMovieEmptyListContainer, addMovieListContainer } from "../components/movieListElement";
import { resetNavigationTool, uniqueResultsPage } from "../components/moviePaginationElement";
import { setViewElementsToolbar } from "../utils/dom";

export function createFormMovieListener(formId: string, inputId: string): void {

    const formElement = document.querySelector<HTMLFormElement>(formId)
    const inputElement = document.querySelector<HTMLInputElement>(inputId)

    if (formElement) {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (inputElement) {
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
            }

        })
    }
}

async function searchMovieBytitle(movieTitle: string): Promise<void> {

    resetNavigationTool()

    const dataMovieSearched = await searchMovieByName(movieTitle)    
    

    if (dataMovieSearched) {
        const resultsNumber = dataMovieSearched.results.length
        applicationStatus.movieSearched = movieTitle

        let attachedElement = document.querySelector<HTMLElement>('#movie-list-container')
        if (attachedElement) {
            attachedElement.innerHTML = ''
            setViewElementsToolbar('main')

            if (resultsNumber === 0) {
                // Dont clear -> applicationStatus.movieDataArray = undefined
                // Maybe at details Page and need a data to return to Main Page
                attachedElement.appendChild(addMovieEmptyListContainer(emptySearchText.no_records))
            } else {
                if (resultsNumber < 20) uniqueResultsPage()
                applicationStatus.movieDataArray = dataMovieSearched.results
                applicationStatus.inSearchedMovie = true
                addMovieListContainer(dataMovieSearched.results, applicationStatus.viewType, false)
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

    }

}