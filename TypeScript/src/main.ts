import { getMovieListData } from './api/api'
import { applicationStatus, defaultInit } from './api/apiConfig'
import { addMovieListContainer } from './components/movieListElement'
import { createPaginationTool } from './components/moviePaginationElement'
import { createMovieUtilsToolbar } from './components/toolbarElement'
import { addEventListeners } from './events/events'
import './scss/style.scss'
import { setDefaultSelectedListMovie } from './utils/dom'

export async function launch(): Promise<void> {

  // Create movie toolbar utils in header
  createMovieUtilsToolbar()

  // Throw API Petition to get initial movies data
  const movieDataArray  = await getMovieListData(defaultInit.movieListType)  

  if (movieDataArray) {
    // Filling global var for the full page
    applicationStatus.movieDataArray = movieDataArray.results

    // Show initial list view movies with default config
    addMovieListContainer(applicationStatus.movieDataArray, defaultInit.listView)

    // Set default List movie data viewed
    setDefaultSelectedListMovie('.movies-categories')

    // Add pagination tool
    createPaginationTool()

    // Create event listeners for elements
    addEventListeners()
  }

}

launch()