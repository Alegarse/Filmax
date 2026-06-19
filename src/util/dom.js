import { applicationStatus } from "../api/apiConfig";

// 0. Entry point
export const containerDomElement = document.querySelector('#app')

export function setViewElementsToolbar(whereAmI) {

  const viewGridButton = document.querySelector('.grid-view')
  const viewListButton = document.querySelector('.list-view')
  const backToMainButton = document.querySelector('.back-main')
  const selectListTypeMovies = document.querySelector('.movies-categories')
  switch (whereAmI) {
    case 'details':
       setVisibility(viewGridButton, false)
       setVisibility(viewListButton, false)
       setVisibility(selectListTypeMovies, false)
       setVisibility(backToMainButton)
      break;
    default:
    case 'main':
      setVisibility(viewGridButton)      
      setVisibility(viewListButton)
      setVisibility(selectListTypeMovies)
      setVisibility(backToMainButton, false)
      break;
  }

}

export function createMovieListContainer() {
  // Element container for list movies
  const moviesContainerElement = document.createElement('div')
  moviesContainerElement.id = 'movie-list-container'
  //moviesContainerElement.classList = 'container'
  return moviesContainerElement
}

export function setDefaultSelectedListMovie(elementDom) {

  const selectElement = document.querySelector(elementDom);

  if(selectElement) selectElement.value = applicationStatus.movieListing;

}

export function setVisibility(domElement, visible = true) {
  visible ? domElement.removeAttribute('hidden') : domElement.setAttribute('hidden', true)
}