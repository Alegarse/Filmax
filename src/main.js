import './scss/style.scss'
import { setDefaultSelectedListMovie } from './util/dom'
import { createMovieUtilsToolbar } from './list-toolbar/list-toolbar'
import { getMovieListData } from './api/api'
import { defaultInit, applicationStatus } from './api/apiConfig'
import { addMovieListContainer } from './movie-list/movie-list'
import { addEventListeners } from './events/events'
import { createPaginationTool } from './movie-list/movie-pagination'


async function launch() {

    // Create movie toolbar utils in header
    createMovieUtilsToolbar()

    // Throw API Petition to get initial movies data
    const {results: movieDataArray} = await getMovieListData(defaultInit.movieListType)

    // Filling global var for the full page
    applicationStatus.movieDataArray = movieDataArray

    // Show initial list view movies with default config
    addMovieListContainer(applicationStatus.movieDataArray,defaultInit.listView)


    // Set default List movie data viewed
    setDefaultSelectedListMovie('.movies-categories')

    // Add pagination tool
    createPaginationTool()
    
    // Create event listeners for elements
    addEventListeners()

}

launch()