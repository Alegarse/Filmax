import { getMovieDetailsData } from "../api/api"
import { apiConfig, emptySearchText, movieViewTypes } from "../api/apiConfig"
import type { MovieCast, MovieCrew, MovieObject } from "../interfaces/interfaces"
import { clearSearchInput } from "../utils/dom"
import { createMovieData, createMovieOverview, createMoviePoster, createMovieTitle } from "./movieCardElement"
import { createCastCard, createCrewCard } from "./movieCastCardElement"
import { addMovieEmptyListContainer } from "./movieListElement"

function createMovieViewElement(movieData: MovieObject, viewType: string, details: boolean = false): HTMLElement {

  const outsideContainerElement: HTMLDivElement = document.createElement('div')
  outsideContainerElement.setAttribute('style', `background-image: url(${apiConfig.backdropBaseUrl}${movieData.backdrop_path})`)
  outsideContainerElement.classList.add('outside-details')
  outsideContainerElement.classList.add('d-flex')  

  const movieElement: HTMLDivElement = document.createElement('div')
  //movieElement.setAttribute('style', `background-image: url(${apiConfig.backdropBaseUrl}${movieData.backdrop_path})`)
  movieElement.classList.add(`${viewType}`) 
  movieElement.classList.add(`container`) 

  movieElement.appendChild(createMoviePoster(movieData.poster_path, movieData.id, true))

  const containerInfoElement = document.createElement('div')
  containerInfoElement.classList.add('movie-info') 

  containerInfoElement.appendChild(createMovieTitle(movieData.title))
  containerInfoElement.appendChild(createMovieData(movieData.vote_average, movieData.release_date))
  containerInfoElement.appendChild(createMovieOverview(movieData.overview, details))

  const movieElementOverlay = document.createElement('div')
  movieElementOverlay.classList.add('movie-backdrop-overlay') 

  movieElement.appendChild(containerInfoElement)

  outsideContainerElement.appendChild(movieElement)
  outsideContainerElement.appendChild(movieElementOverlay)

  return outsideContainerElement
}

function createCastMovieElement(dataCastMovie: MovieCast[]): HTMLElement {

  const castsElement: HTMLElement = document.createElement('div')
  castsElement.classList.add('cast-container') 
  castsElement.classList.add('container')

  const titleCastsContainer = document.createElement('p')
  titleCastsContainer.classList.add('cast-container-title') 
  titleCastsContainer.textContent = 'Reparto'

  const castsContainer = document.createElement('div')
  castsContainer.classList.add('casts-elements')

  dataCastMovie.forEach(cast => {
    const castElement = createCastCard(cast)
    castsContainer.appendChild(castElement)
  })

  castsElement.appendChild(titleCastsContainer)
  castsElement.appendChild(castsContainer)

  return castsElement

}

function createCrewMovieElement(dataCrewMovie: MovieCrew[]): HTMLElement {

  const crewsElement: HTMLElement = document.createElement('div')
  crewsElement.classList.add('cast-container')
  crewsElement.classList.add('container') 

  const titleCrewContainer = document.createElement('p')
  titleCrewContainer.classList.add('cast-container-title') 
  titleCrewContainer.textContent = 'Equipo técnico'

  const crewsContainer = document.createElement('div')
  crewsContainer.classList.add('casts-elements') 

  dataCrewMovie.forEach(crew => {
    const crewElement = createCrewCard(crew)
    crewsContainer.appendChild(crewElement)
  })

  crewsElement.appendChild(titleCrewContainer)
  crewsElement.appendChild(crewsContainer)

  return crewsElement

}

export async function addMovieDetailsContainer(movieId: string): Promise<void> {

    const movieData = await getMovieDetailsData(movieId)

    if (!movieData) {
        let attachedElement = document.querySelector<HTMLElement>('#movie-list-container')
        if (attachedElement) {
            attachedElement.innerHTML = ''
            attachedElement.appendChild(addMovieEmptyListContainer(emptySearchText.no_details))
        }
    } else {
        createDetailsMovieContainer(movieData)
    }
}

export function createDetailsMovieContainer(movieData: MovieObject) {

  // Clear input search
    clearSearchInput();

    // Element container for show movie details
    const moviesContainerElement = document.querySelector<HTMLElement>('#movie-list-container')

    const movieDetailsElement = createMovieViewElement(movieData, movieViewTypes.Details, true)
    const movieCastElements = createCastMovieElement(movieData?.credits?.cast)
    const movieCrewElement = createCrewMovieElement(movieData?.credits?.crew)

    if (moviesContainerElement) {
        moviesContainerElement.classList.add('details-container') 
        moviesContainerElement.appendChild(movieDetailsElement)
        moviesContainerElement.appendChild(movieCastElements)
        moviesContainerElement.appendChild(movieCrewElement)
    }




}