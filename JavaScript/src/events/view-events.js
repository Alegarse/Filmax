import { setViewElementsToolbar, setVisibility } from "../util/dom";
import { addMovieListContainer, changeViewMovieElement } from "../movie-list/movie-list";
import { applicationStatus } from "../api/apiConfig";
import { addMovieDetailsContainer } from "../movie-details/movie-details";
import { changeDataMoviesFromPagination } from "../movie-list/movie-pagination";

export function createViewChangeListener(elementSelected, viewType) {

    const selectedViewButton = document.querySelector(elementSelected)

    selectedViewButton.addEventListener('click', () => {
        changeViewMovieElement(viewType)
        applicationStatus.viewType = viewType
    })
}

export function buttonBackHomeListener(elementSelected) {

    const backMainButton = document.querySelector(elementSelected)

    backMainButton.addEventListener('click', () => {
        let attachedElement = document.querySelector('#movie-list-container')
        attachedElement.innerHTML = ''
        const pagToolElement = document.querySelector('.pagination-tool')
        setVisibility(pagToolElement)
        addMovieListContainer(applicationStatus.movieDataArray, applicationStatus.viewType, false)
        setViewElementsToolbar('main')
    })

}

export function createMoviePosterListener() {

    const clickContainer = document.querySelector('#app')
    clickContainer.addEventListener('click', async (event) => {
        const target = event.target
        if (target.hasAttribute('data-movie-id')) {
            const movieId = target.getAttribute('data-movie-id')
            setViewElementsToolbar('details')
            const attachedElement = document.querySelector('#movie-list-container')
            attachedElement.innerHTML = ''
            const pagToolElement = document.querySelector('.pagination-tool')
            setVisibility(pagToolElement,false)
            addMovieDetailsContainer(movieId)
        }
    })
}

export async function createPageClickListener() {

    const clickContainer = document.querySelector('.pagination-tool')

    clickContainer.addEventListener('click',(event) => {
        const classSelected = event.target.classList.value

        if (classSelected.includes('next-page')) {
            applicationStatus.actualPage += 1
            document.querySelector('.actual-page').textContent = applicationStatus.actualPage
            document.querySelector('.previous-page').removeAttribute('disabled')
        }
        if (classSelected.includes('previous-page')) {
            if (applicationStatus.actualPage > 1) {
                applicationStatus.actualPage -= 1 
                document.querySelector('.actual-page').textContent = applicationStatus.actualPage
                document.querySelector('.next-page').removeAttribute('disabled')
                if(applicationStatus.actualPage === 1) document.querySelector('.previous-page').setAttribute('disabled', true)
            }
        }
        changeDataMoviesFromPagination()
        window.scrollTo({ top: 0, behavior: 'smooth' })        
    })
}