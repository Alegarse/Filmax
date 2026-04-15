import { applicationStatus } from "../api/apiConfig"
import { addMovieDetailsContainer } from "../components/movieDetailsElement"
import { addMovieListContainer, changeViewMovieElement } from "../components/movieListElement"
import { changeDataMoviesFromPagination } from "../components/moviePaginationElement"
import { launch } from "../main"
import { containerDomElement, setViewElementsToolbar, setVisibility } from "../utils/dom"

export function createViewChangeListener(elementSelected: string, viewType: string): void {

    const selectedViewButton = document.querySelector<HTMLElement>(elementSelected)

    if (!selectedViewButton) return
    selectedViewButton.addEventListener('click', () => {
        changeViewMovieElement(viewType)
        applicationStatus.viewType = viewType
    })
}

export function buttonBackHomeListener(elementSelected: string): void {

    const backMainButton = document.querySelector(elementSelected)

    if (!backMainButton) return
    backMainButton.addEventListener('click', () => {
        let attachedElement = document.querySelector('#movie-list-container')
        if (!attachedElement) return
        attachedElement.innerHTML = ''
        const pagToolElement = document.querySelector<HTMLElement>('.pagination-tool')
        setVisibility(pagToolElement)
        addMovieListContainer(applicationStatus.movieDataArray, applicationStatus.viewType, false)
        setViewElementsToolbar('main')
    })
}

export function createMoviePosterListener(): void {

    const clickContainer = document.querySelector('#app')
    if (!clickContainer) return
    clickContainer.addEventListener('click', async (event: Event) => {
        const target = event.target as HTMLSelectElement
        if (target.hasAttribute('data-movie-id')) {
            const movieId = target.getAttribute('data-movie-id')
            setViewElementsToolbar('details')
            const attachedElement = document.querySelector<HTMLElement>('#movie-list-container')
            if (attachedElement) attachedElement.innerHTML = ''
            const pagToolElement = document.querySelector<HTMLElement>('.pagination-tool')
            setVisibility(pagToolElement, false)
            if (movieId)
                addMovieDetailsContainer(movieId)
        }
    })
}

export async function createPageClickListener(): Promise<void> {

    const clickContainer = document.querySelector<HTMLElement>('.pagination-tool')
    const actualPage = document.querySelector('.actual-page')
    const prevoiusPage = document.querySelector('.previous-page')
    const nextPage = document.querySelector('.next-page')

    if (clickContainer) {
        clickContainer.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement
            if (target) {
                const classSelected = target.classList.value

                if (classSelected.includes('next-page')) {
                    applicationStatus.actualPage += 1
                    if (actualPage) actualPage.textContent = applicationStatus.actualPage.toString()
                    if (prevoiusPage) prevoiusPage.removeAttribute('disabled')
                }
                if (classSelected.includes('previous-page')) {
                    if (applicationStatus.actualPage > 1) {
                        applicationStatus.actualPage -= 1
                        if (actualPage) actualPage.textContent = applicationStatus.actualPage.toString()
                        if (nextPage) nextPage.removeAttribute('disabled')
                        if (applicationStatus.actualPage === 1 && prevoiusPage) prevoiusPage.setAttribute('disabled', "true")
                    }
                }
                changeDataMoviesFromPagination()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }

        })
    }

}

export function createLogoListener() {
    const logoElement = document.querySelector<HTMLElement>("#logo-ppal")
    if (logoElement) {
        logoElement.addEventListener("click", (event) => {
            event.preventDefault();
            if (containerDomElement) containerDomElement.innerHTML = ""; 
            launch()
        })
    }
}