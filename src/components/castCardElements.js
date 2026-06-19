import { apiConfig, jobTraductions } from "../api/apiConfig";

/**
 * 
 * @param {*} photoUrl 
 * @returns Element img actor
 */
function createCastImg(photoUrl) {
    const castImgElement = document.createElement('img');
    let srcString = `${apiConfig.photoBaseUrl}${photoUrl}`
    if (photoUrl == null) srcString = '/empty_char.png'
    castImgElement.setAttribute('src', srcString);
    castImgElement.classList = 'cast-img'
    return castImgElement
}

/**
 * 
 * @param {*} name 
 * @returns Element  with actor name
 */
function createCastName(name) {
    const castNameElement = document.createElement('p')
    castNameElement.textContent = name
    castNameElement.classList = 'cast-name'
    return castNameElement
}

/**
 * 
 * @param {*} name 
 * @returns Element  with actor character
 */
function createCastCharName(characterName) {
    const castNameElement = document.createElement('p')
    castNameElement.textContent = characterName
    castNameElement.classList = 'cast-charname'
    return castNameElement
}

/**
 * 
 * @param {*} actor 
 * @returns Element card for actor
 */
export function createCastCard(cast,type = 0) {
    const castCardElement = document.createElement('div')
    castCardElement.classList = 'cast-card'

    castCardElement.appendChild(createCastImg(cast.profile_path))
    castCardElement.appendChild(createCastName(cast.original_name))
    let assignedRol = cast.character
    if (type === 1){
        const job = cast.job.replaceAll(' ','_').replaceAll('"','').toLowerCase()
        assignedRol = jobTraductions[job]
        if (assignedRol === undefined) assignedRol = cast.job
    } 
    castCardElement.appendChild(createCastCharName(assignedRol))

    return castCardElement
}