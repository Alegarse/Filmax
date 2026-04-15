export interface ApiConfig {
    apiKey: string,
    langIso: string,
    baseUrl: string,
    posterBaseUrl: string,
    backdropBaseUrl: string,
    photoBaseUrl: string,
}

export interface MovieListType {
    Populares: string,
    Mas_valoradas: string,
    Proximamente: string,
    En_cartelera: string,
}

export interface MovieViewTypes {
    Grid: string,
    List: string,
    Details: string,
}

export interface DefaultInit {
    movieListType: string,
    listView: string,
    actualPage: number,
}

export interface ApplicationStatus {
    viewType: string,
    actualPage: number,
    movieListing: string,
    movieDataArray: MovieObject[] | undefined,
    inSearchedMovie: boolean,
    movieSearched: string,
}

export interface MovieObjectsArray {
    page: number
    results: MovieObject[]
    total_pages: number
    total_results: number
}


export interface MovieObject {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string
    release_date: string
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    credits: Credits
}

export interface Credits {
    cast: MovieCast[],
    crew: MovieCrew[]
}

export interface EmptySearchText {
    no_records: string,
    no_details: string,
}

export interface MovieCast {
    adult: boolean,
    cast_id: number,
    character: string,
    credit_id: string,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    order: number,
    original_name: string,
    popularity: number,
    profile_path: string
}

export interface MovieCrew {
    adult: boolean,
    credit_id: string,
    department: string,
    gender: number,
    id: number,
    job: string,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string
}

export interface JobTraductions {
    [key: string]: string
}

export type ButtonRole = 'back' | 'next' | 'actual'