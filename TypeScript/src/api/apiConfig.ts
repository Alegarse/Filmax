import type { ApiConfig, ApplicationStatus, DefaultInit, EmptySearchText, JobTraductions, MovieListType, MovieViewTypes } from "../interfaces/interfaces";

export const apiConfig: ApiConfig = {
  apiKey: '798c4e985f1601de1b9c61af5c37edcf',
  langIso: 'es-ES',
  baseUrl: 'https://api.themoviedb.org/3/',
  posterBaseUrl: 'http://image.tmdb.org/t/p/w500/',
  backdropBaseUrl: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces',
  photoBaseUrl: 'https://www.themoviedb.org/t/p/w138_and_h175_face/',
};

export const movieListType: MovieListType = {
  Populares: 'popular',
  Mas_valoradas: 'top_rated',
  Proximamente: 'upcoming',
  En_cartelera: 'now_playing',
};

export const movieViewTypes: MovieViewTypes = {
  Grid: 'movie-grid',
  List: 'movie-list',
  Details: 'movie-details',
};

export const defaultInit: DefaultInit = {
  movieListType: 'upcoming',
  listView: 'movie-grid',
  actualPage: 1,
};

export const applicationStatus: ApplicationStatus = {
  viewType: defaultInit.listView,
  actualPage: defaultInit.actualPage,
  movieListing: defaultInit.movieListType,
  movieDataArray: undefined,
  inSearchedMovie: false,
  movieSearched: '',
};

export const emptySearchText: EmptySearchText = {
  no_records: 'La búsqueda realizada no ha arrojado ningún resultado',
  no_details: 'La película seleccionada no dispone de detalles',
};

export const jobTraductions: JobTraductions = {
  editor: 'Editor',
  short_story: 'Historia original',
  screenplay: 'Guionista',
  director_of_photography: 'Director de fotografía',
  original_music_composer: 'Compositor BSO',
  casting: 'Casting',
  production_design: 'Diseño de producción',
  art_direction: 'Dirección artística',
  producer: 'Producción',
  line_producer: 'Producción',
  executive_producer: 'Producción ejecutiva',
  story: 'Historia',
  director: 'Director',
  stunt_double: 'Actor de doblaje',
  stunts: 'Actor de doblaje',
  stunt_coordinator: 'Coordinador de doblaje',
  fight_choreographer: 'Coreógrafo de acción',
  title_designer: 'Diseñador de títulos',
  production_manager: 'Manager de producción',
  production_coordinator: 'Coordinador de producción',
  visual_effects_supervisor: 'Supervisor efectos visuales',
  visual_effects_producer: 'Productor efectos visuales',
  still_photographer: 'Fotografía',
  costume_designer: 'Diseño de vestuario',
  sound_designer: 'Diseño de sonido',
  foley_artist: 'Técnico de sonido',
  makeup_department_head: 'Jefe departamento maquillaje',
  writer: 'Guionista',
  screenstory: 'Adaptación del guión',
  video_game: 'Adaptación del videojuego',
  second_unit_director: 'Director escenas adiccionales',
  hair_designer: 'Diseño de peinados',
  a_camera_operator: 'Operador de cámara',
  colorist: 'Encargado del color',
  costume_design: 'Diseñador de vestuario',
  music_supervisor: 'Supervisor de música',
  camera_operator: 'Operador de cámara',
  associate_producer: 'Productor asociado',
  art_designer: 'Diseñador de maquetación',
  novel: 'Guionista',
  characters: 'Personajes',
  first_assistant_director: 'Primer asistente dirección',
};