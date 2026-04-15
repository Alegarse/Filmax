import type { MovieObject } from "../interfaces/interfaces";
import { clearSearchInput, containerDomElement, createMovieListContainer } from "../utils/dom";
import { createMovieData, createMovieOverview, createMoviePoster, createMovieTitle } from "./movieCardElement";

export function createMovieViewElement(movie: MovieObject, viewType: string, details: boolean = false): HTMLElement {
  const movieElement = document.createElement("div");

  movieElement.classList.add(`movie-card`)
  movieElement.classList.add(`${viewType}`)
  if (viewType === "movie-grid") {
    movieElement.classList.add("col-lg-3")
    movieElement.classList.add("col-md-4")
    movieElement.classList.add("col-md-4")
  }
  movieElement.appendChild(createMoviePoster(movie.poster_path, movie.id));

  const containerInfoElement = document.createElement("div");
  containerInfoElement.classList.add("movie-info")

  containerInfoElement.appendChild(createMovieTitle(movie.title));
  containerInfoElement.appendChild(
    createMovieData(
      movie.vote_average === undefined ? 0 : movie.vote_average,
      movie.release_date
    )
  );
  containerInfoElement.appendChild(
    createMovieOverview(movie.overview, details)
  );

  movieElement.appendChild(containerInfoElement);

  return movieElement;
}

export function changeViewMovieElement(viewType: string): void {
  const movieCardElements: NodeListOf<Element> = document.querySelectorAll(".movie-card");
  movieCardElements.forEach((movieCard) => {
    movieCard.classList.add(`movie-card ${viewType}`)
    movieCard.classList.add(viewType === "movie-grid" ? " col-lg-3 col-md-4 col-sm-6" : "")
  });
}

export async function addMovieListContainer(
  movieDataArray: MovieObject[],
  listView: string,
  start: boolean = true
): Promise<void> {

  // Clear input search
  clearSearchInput();

  // Element container for list movies
  let moviesContainerElement;
  if (start) {
    moviesContainerElement = createMovieListContainer();
    // Insert container into DOM
    if (!containerDomElement) return;
    containerDomElement.appendChild(moviesContainerElement);
  } else {
    moviesContainerElement = document.querySelector("#movie-list-container");
  }

  // Element ROW to show movies
  const rowElement = document.createElement("div");
  rowElement.classList.add("row")
  rowElement.classList.add("container")

  //For each movie need to create a movie card element
  movieDataArray.forEach((movieData) => {
    const movieCardElement = createMovieViewElement(movieData, listView);
    // Insert movieCardelement into ROW element
    rowElement.appendChild(movieCardElement);
  });

  // Insert ROW into container
  if (!moviesContainerElement) return;
  moviesContainerElement.appendChild(rowElement);
}

export function addMovieEmptyListContainer(text: string): HTMLElement {
  // Element ROW to show movies
  const rowElement: HTMLElement = document.createElement("div");
  rowElement.classList.add("row empty")
  rowElement.textContent = text;
  return rowElement;
}