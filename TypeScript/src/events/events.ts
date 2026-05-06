import { movieViewTypes } from "../api/apiConfig";
import { createFormMovieListener } from "./formEvents";
import { createMovieListChangeListener } from "./selecEvents";
import { buttonBackHomeListener, createLogoListener, createMoviePosterListener, createPageClickListener, createViewChangeListener } from "./viewEvents";

export function addEventListeners(): void {
  // Buttons
  createViewChangeListener(".grid-view", movieViewTypes.Grid);
  createViewChangeListener(".list-view", movieViewTypes.List);
  buttonBackHomeListener(".back-main");

  // Select
  createMovieListChangeListener(".movies-categories");

  // Movie poster
  createMoviePosterListener();

  // Button for input element
  createFormMovieListener("#search-movie-form", "#search-movie-input");

  // Pagination section
  createPageClickListener();

  // Create logo listener
  createLogoListener();

}