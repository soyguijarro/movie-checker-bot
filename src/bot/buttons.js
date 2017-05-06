import {
  getMovieId, getMovieSummary, getMovieExternalLinks,
  getPersonId, getPersonSummary, getPersonExternalLinks,
} from '../data/formatters';

export const getMovieDisambiguationButtons = movies =>
  movies.map(movie => [{
    text: getMovieSummary(movie),
    callback_data: `movieDetails ${getMovieId(movie)}`,
  }]);

export const getMovieExternalLinksButtons = getMovieExternalLinks;

export const getPersonDisambiguationButtons = people =>
  people.map(person => [{
    text: getPersonSummary(person),
    callback_data: `personDetails ${getPersonId(person)}`,
  }]);

export const getPersonExternalLinksButtons = getPersonExternalLinks;
