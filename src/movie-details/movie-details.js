import { containerDomElement, createMovieListContainer } from "../util/dom"
import { addMovieEmptyListContainer } from "../movie-list/movie-list"
import { createMoviePoster, createMovieTitle, createMovieData, createMovieOverview } from "../components/movieCardElements"
import { createCastCard } from "../components/castCardElements"
import { getMovieDetailsData } from "../api/api"
import { movieViewTypes, apiConfig, emptySearchText } from "../api/apiConfig"

export async function addMovieDetailsContainer(movieId) {

  const movieData = await getMovieDetailsData(movieId)

  if (movieData === undefined) {
    let attachedElement = document.querySelector('#movie-list-container')
    attachedElement.innerHTML = ''
    attachedElement.appendChild(addMovieEmptyListContainer(emptySearchText.no_details))
  } else {
    createDetailsMovieContainer(movieData)
  }
}

function createMovieViewElement(movieData, viewType, details = false) {

  const outsideContainerElement = document.createElement('div')
  outsideContainerElement.setAttribute('style', `background-image: url(${apiConfig.backdropBaseUrl}${movieData.backdrop_path})`)
  outsideContainerElement.classList = 'outside-details  d-flex'

  const movieElement = document.createElement('div')
  //movieElement.setAttribute('style', `background-image: url(${apiConfig.backdropBaseUrl}${movieData.backdrop_path})`)
  movieElement.classList = `${viewType} container`

  movieElement.appendChild(createMoviePoster(movieData.poster_path, movieData.id, true))

  const containerInfoElement = document.createElement('div')
  containerInfoElement.classList = 'movie-info'

  containerInfoElement.appendChild(createMovieTitle(movieData.title))
  containerInfoElement.appendChild(createMovieData(movieData.vote_average, movieData.release_date))
  containerInfoElement.appendChild(createMovieOverview(movieData.overview, details))

  const movieElementOverlay = document.createElement('div')
  movieElementOverlay.classList = 'movie-backdrop-overlay'

  movieElement.appendChild(containerInfoElement)

  outsideContainerElement.appendChild(movieElement)
  outsideContainerElement.appendChild(movieElementOverlay)

  return outsideContainerElement
}

function createCastMovieElement(dataCastMovie) {

  const castsElement = document.createElement('div')
  castsElement.classList = 'cast-container container'

  const titleCastsContainer = document.createElement('p')
  titleCastsContainer.classList = 'cast-container-title'
  titleCastsContainer.textContent = 'Reparto'

  const castsContainer = document.createElement('div')
  castsContainer.classList = 'casts-elements'

  dataCastMovie.forEach(cast => {
    const castElement = createCastCard(cast)
    castsContainer.appendChild(castElement)
  })

  castsElement.appendChild(titleCastsContainer)
  castsElement.appendChild(castsContainer)

  return castsElement

}

function createCrewMovieElement(dataCrewMovie) {

  const crewsElement = document.createElement('div')
  crewsElement.classList = 'cast-container container'

  const titleCrewContainer = document.createElement('p')
  titleCrewContainer.classList = 'cast-container-title'
  titleCrewContainer.textContent = 'Equipo técnico'

  const crewsContainer = document.createElement('div')
  crewsContainer.classList = 'casts-elements'

  dataCrewMovie.forEach(crew => {
    const crewElement = createCastCard(crew, 1)
    crewsContainer.appendChild(crewElement)
  })

  crewsElement.appendChild(titleCrewContainer)
  crewsElement.appendChild(crewsContainer)

  return crewsElement

}

export function createDetailsMovieContainer(movieData) {

  // Element container for show movie details
  const moviesContainerElement = document.querySelector('#movie-list-container')
  moviesContainerElement.classList += ' details-container'

  const movieDetailsElement = createMovieViewElement(movieData, movieViewTypes.Details, true)
  const movieCastElements = createCastMovieElement(movieData.credits.cast)
  const movieCrewElement = createCrewMovieElement(movieData.credits.crew)

  moviesContainerElement.appendChild(movieDetailsElement)
  moviesContainerElement.appendChild(movieCastElements)
  moviesContainerElement.appendChild(movieCrewElement)
}