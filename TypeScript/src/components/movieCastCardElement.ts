import { apiConfig, jobTraductions } from "../api/apiConfig";
import type { MovieCast, MovieCrew } from "../interfaces/interfaces"

function createCastImg(photoUrl: string): HTMLElement {
    const castImgElement: HTMLElement = document.createElement('img');
    let srcString = `${apiConfig.photoBaseUrl}${photoUrl}`
    if (photoUrl == null) srcString = '/empty_char.png'
    castImgElement.setAttribute('src', srcString);
    castImgElement.classList.add('cast-img') 
    return castImgElement
}

function createCastName(name: string): HTMLElement {
    const castNameElement: HTMLElement = document.createElement('p')
    castNameElement.textContent = name
    castNameElement.classList.add('cast-name') 
    return castNameElement
}

function createCastCharName(characterName: string): HTMLElement {
    const castNameElement: HTMLElement = document.createElement('p')
    castNameElement.textContent = characterName
    castNameElement.classList.add('cast-charname')
    return castNameElement
}

export function createCastCard(cast: MovieCast): HTMLElement {
    const castCardElement = document.createElement('div')
    castCardElement.classList.add('cast-card') 

    castCardElement.appendChild(createCastImg(cast.profile_path))
    castCardElement.appendChild(createCastName(cast.original_name))
    let assignedRol = cast.character
    castCardElement.appendChild(createCastCharName(assignedRol))

    return castCardElement
}

export function createCrewCard(crew: MovieCrew): HTMLElement {
    const castCardElement: HTMLElement = document.createElement('div')
    castCardElement.classList.add('cast-card')

    castCardElement.appendChild(createCastImg(crew.profile_path))
    castCardElement.appendChild(createCastName(crew.original_name))

    const job = crew.job.replaceAll(' ','_').replaceAll('"','').toLowerCase()
        let assignedRol = jobTraductions[job]
        if (assignedRol === undefined) assignedRol = crew.job

    castCardElement.appendChild(createCastCharName(assignedRol))

    return castCardElement
}