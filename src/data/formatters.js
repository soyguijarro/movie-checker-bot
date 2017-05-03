import { formatDate, formatYear, joinArrayBy, identity } from '../utils';
import { PROPS_FORMATTERS } from './constants';

const joinBySpace = joinArrayBy('  ');
const joinByCommas = joinArrayBy(', ');
const joinByNewLine = joinArrayBy('\n');
const joinByDoubleNewLine = joinArrayBy('\n\n');

const getFormattedProp = (placeholder, prop, transformFn, messageKey) => (movie) => {
  const data = movie[prop];
  const isValid = Array.isArray(data) ? data.length : !!data;
  const formatter = PROPS_FORMATTERS[messageKey || prop] || identity;

  return formatter(isValid ? transformFn(data) : placeholder);
};

const getTitle = getFormattedProp('', 'title', identity);

const getOriginalTitle = getFormattedProp('', 'originalTitle', identity);

const getReleaseYear = getFormattedProp('', 'releaseDate', formatYear, 'releaseYear');

const getReleaseDate = getFormattedProp('–', 'releaseDate', formatDate);

const getRuntime = getFormattedProp('–', 'runtime', identity);

const getScore = getFormattedProp('–', 'score', identity);

const getGenres = getFormattedProp('–', 'genres', joinByCommas);

const getCountries = getFormattedProp('–', 'countries', joinByCommas);

const getDirectors = getFormattedProp('–', 'directors', joinByCommas);

const getWriters = getFormattedProp('–', 'writers', joinByCommas);

const getCast = getFormattedProp('–', 'cast', joinByCommas);

const getPlot = getFormattedProp('', 'plot', identity);

const getTMDbLink = getFormattedProp('', 'id', id => `https://www.themoviedb.org/movie/${id}`);

const getIMDbLink = getFormattedProp('', 'IMDbId', id => `http://www.imdb.com/title/${id}`);

const getLetterboxdLink = getFormattedProp('', 'IMDbId', id => `http://letterboxd.com/imdb/${id}`);

export const getId = ({ id }) => id;

export const getSummary = (movie) => {
  const title = getTitle(movie);
  const releaseYear = getReleaseYear(movie);

  return `${title}${releaseYear ? ` (${releaseYear})` : ''}`;
};

const getFullTitle = (movie) => {
  const title = getTitle(movie);
  const originalTitle = getOriginalTitle(movie);

  return `*${title}*${originalTitle !== title ? `\n${originalTitle}` : ''}`;
};

export const getDetails = (movie) => {
  const factsBlock = [
    joinBySpace([getReleaseDate(movie), getRuntime(movie), getScore(movie)]),
    getGenres(movie), getCountries(movie),
  ];
  const castAndCrewBlock = [getDirectors(movie), getWriters(movie), getCast(movie)];

  return joinByDoubleNewLine([
    getFullTitle(movie),
    joinByNewLine(factsBlock),
    joinByNewLine(castAndCrewBlock),
    getPlot(movie),
  ]);
};

export const getExternalLinks = movie => [
  { text: 'TMDb', url: getTMDbLink(movie) },
  { text: 'IMDb', url: getIMDbLink(movie) },
  { text: 'Letterboxd', url: getLetterboxdLink(movie) },
];
