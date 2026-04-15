import { movieListType } from "../api/apiConfig"

/**
 * 
 * @param {*} categories 
 * @returns Select with category options
 */
function createSelectElement() {

    const selectElement = document.createElement('select')
    selectElement.classList.add('movies-categories form-select')

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
    wrapperUtilsToolbar.classList.add('movie-toolbar-wrapper d-flex') 

    const toolbarElements = document.createElement('div')
    toolbarElements.classList.add('container toolbar') 

    const typesViewsContainer = document.createElement('div')
    typesViewsContainer.classList.add('view-selectors')

    const backtoHomeSelector = document.createElement('button')
    backtoHomeSelector.classList.add('back-main') 
    backtoHomeSelector.setAttribute('hidden', true)

    const gridViewSelector = document.createElement('button')
    gridViewSelector.classList.add('grid-view') 

    const listViewSelector = document.createElement('button')
    listViewSelector.classList.add('list-view')    

    typesViewsContainer.appendChild(backtoHomeSelector)
    typesViewsContainer.appendChild(gridViewSelector)
    typesViewsContainer.appendChild(listViewSelector)

    toolbarElements.appendChild(typesViewsContainer)
    toolbarElements.appendChild(createSelectElement())

    wrapperUtilsToolbar.appendChild(toolbarElements)

    toolbarElementDOM.appendChild(wrapperUtilsToolbar)
}