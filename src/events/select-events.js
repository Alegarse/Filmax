import { applicationStatus } from "../api/apiConfig";
import { getMovieListData } from "../api/api";
import { addMovieListContainer } from "../movie-list/movie-list";
import { resetNavigationTool } from "../movie-list/movie-pagination";

export function createMovieListChangeListener(elementSelected) {

    const selectedElement = document.querySelector(elementSelected)

    selectedElement.addEventListener('change', async (event) => {
        resetNavigationTool()
        const {results: movieDataArray} = await getMovieListData(event.target.value)
        applicationStatus.movieDataArray = movieDataArray
        applicationStatus.movieListing = event.target.value
        applicationStatus.inSearchedMovie = false
        applicationStatus.movieSearched = ''
        const attachedElement = document.querySelector('#movie-list-container')
        attachedElement.innerHTML = ''
        addMovieListContainer(movieDataArray,applicationStatus.viewType,false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}