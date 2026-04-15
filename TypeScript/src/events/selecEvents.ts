import { getMovieListData } from "../api/api"
import { applicationStatus } from "../api/apiConfig"
import { addMovieListContainer } from "../components/movieListElement"
import { resetNavigationTool } from "../components/moviePaginationElement"

export function createMovieListChangeListener(elementSelected: string): void {

    const selectedElement = document.querySelector<HTMLSelectElement>(elementSelected)

    if (!selectedElement) return
    selectedElement.addEventListener('change', async (event: Event) => {
        resetNavigationTool()
        const target = event.target as HTMLSelectElement
        const { results: movieDataArray } = await getMovieListData(target.value)
        applicationStatus.movieDataArray = movieDataArray
        applicationStatus.movieListing = target.value
        applicationStatus.inSearchedMovie = false
        applicationStatus.movieSearched = ''
        const attachedElement = document.querySelector<HTMLElement>('#movie-list-container')
        if (attachedElement) {
            attachedElement.innerHTML = ''
        }
        addMovieListContainer(movieDataArray, applicationStatus.viewType, false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}