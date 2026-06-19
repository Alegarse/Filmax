import { movieListType } from "../api/apiConfig"

/**
 * 
 * @param {*} categories 
 * @returns Select with category options
 */
function createSelectElement() {

    const selectElement = document.createElement('select')
    selectElement.classList = 'movies-categories form-select'

    const arrayCategories = Object.entries(movieListType)

    arrayCategories.forEach(category => {
        const optionElement = document.createElement('option')
        optionElement.setAttribute('value', category[1])
        optionElement.textContent = category[0].replaceAll('_',' ')
        selectElement.appendChild(optionElement)
    })

    return selectElement
}

export function createMovieUtilsToolbar() {

    const toolbarElementDOM = document.querySelector('#app')

    const wrapperUtilsToolbar = document.createElement('div')
    wrapperUtilsToolbar.classList = 'movie-toolbar-wrapper d-flex'

    const toolbarElements = document.createElement('div')
    toolbarElements.classList = 'container toolbar'

    const typesViewsContainer = document.createElement('div')
    typesViewsContainer.classList = 'view-selectors'

    const backtoHomeSelector = document.createElement('button')
    backtoHomeSelector.classList = 'back-main'
    backtoHomeSelector.setAttribute('hidden', true)

    const gridViewSelector = document.createElement('button')
    gridViewSelector.classList = 'grid-view'

    const listViewSelector = document.createElement('button')
    listViewSelector.classList = 'list-view'    

    typesViewsContainer.appendChild(backtoHomeSelector)
    typesViewsContainer.appendChild(gridViewSelector)
    typesViewsContainer.appendChild(listViewSelector)

    toolbarElements.appendChild(typesViewsContainer)
    toolbarElements.appendChild(createSelectElement())

    wrapperUtilsToolbar.appendChild(toolbarElements)

    toolbarElementDOM.appendChild(wrapperUtilsToolbar)
}