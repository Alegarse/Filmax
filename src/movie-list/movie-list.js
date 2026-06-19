import {
  createMoviePoster,
  createMovieTitle,
  createMovieData,
  createMovieOverview,
} from "../components/movieCardElements.js";
import { containerDomElement, createMovieListContainer } from "../util/dom.js";

export function createMovieViewElement(movie, viewType, details = false) {
  const movieElement = document.createElement("div");

  movieElement.classList += `movie-card ${viewType}`;
  movieElement.classList +=
    viewType === "movie-grid" ? " col-lg-3 col-md-4 col-sm-6" : "";
  movieElement.appendChild(createMoviePoster(movie.poster_path, movie.id));

  const containerInfoElement = document.createElement("div");
  containerInfoElement.classList = "movie-info";

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

export function changeViewMovieElement(viewType) {
  const movieCardElements = document.querySelectorAll(".movie-card");
  movieCardElements.forEach((movieCard) => {
    movieCard.classList = `movie-card ${viewType}`;
    movieCard.classList +=
      viewType === "movie-grid" ? " col-lg-3 col-md-4 col-sm-6" : "";
  });
}

export async function addMovieListContainer(
  movieDataArray,
  listView,
  start = true
) {
  // Element container for list movies
  let moviesContainerElement;
  if (start) {
    moviesContainerElement = createMovieListContainer();
    // Insert container into DOM
    containerDomElement.appendChild(moviesContainerElement);
  } else {
    moviesContainerElement = document.querySelector("#movie-list-container");
  }

  // Element ROW to show movies
  const rowElement = document.createElement("div");
  rowElement.classList = "row container";

  //For each movie need to create a movie card element
  movieDataArray.forEach((movieData) => {
    const movieCardElement = createMovieViewElement(movieData, listView);
    // Insert movieCardelement into ROW element
    rowElement.appendChild(movieCardElement);
  });

  // Insert ROW into container
  moviesContainerElement.appendChild(rowElement);
}

export function addMovieEmptyListContainer(text) {
  // Element ROW to show movies
  const rowElement = document.createElement("div");
  rowElement.classList = "row empty";
  rowElement.textContent = text;

  return rowElement;
}
