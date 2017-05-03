import MovieDB from 'moviedb';

import { TMDB_TOKEN } from './constants';

const api = MovieDB(TMDB_TOKEN);

export const fetchMovieMatches = query =>
  new Promise((resolve, reject) => {
    api.searchMovie({ query }, (error, response) => {
      if (error || !response) return reject(error);
      return resolve(response.results || []);
    });
  });

const fetchMovieInfo = id =>
  new Promise((resolve, reject) => {
    api.movieInfo({ id }, (error, response) => {
      if (error || !response) return reject(error);
      return resolve(response);
    });
  });

const fetchMovieCredits = id =>
  new Promise((resolve, reject) => {
    api.movieCredits({ id }, (error, response) => {
      if (error || !response) return reject(error);
      return resolve({
        cast: response.cast || [],
        crew: response.crew || [],
      });
    });
  });

export const fetchMovieDetails = id =>
  Promise.all([fetchMovieInfo(id), fetchMovieCredits(id)])
    .then(([info, credits]) => Object.assign({}, info, credits));
