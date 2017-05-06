import { formatDate, formatYear, getAge, joinArrayBy, getStringBeforeChar, identity } from '../utils';
import { PROPS_FORMATTERS } from './constants';

const joinBySpace = joinArrayBy('  ');
const joinByCommas = joinArrayBy(', ');
const joinByNewLine = joinArrayBy('\n');
const joinByDoubleNewLine = joinArrayBy('\n\n');

const getFormattedProp = (placeholder, prop, transformFn, messageKey) => (object) => {
  const data = object[prop];
  const isValid = Array.isArray(data) ? data.length : !!data;
  const formatter = PROPS_FORMATTERS[messageKey || prop] || identity;

  return formatter(isValid ? transformFn(data) : placeholder);
};

const getMovieTitle = getFormattedProp('', 'title', identity);

const getMovieOriginalTitle = getFormattedProp('', 'originalTitle', identity);

const getMovieReleaseYear = getFormattedProp('', 'releaseDate', formatYear, 'releaseYear');

const getMovieReleaseDate = getFormattedProp('–', 'releaseDate', formatDate);

const getMovieRuntime = getFormattedProp('–', 'runtime', identity);

const getMovieScore = getFormattedProp('–', 'score', identity);

const getMovieGenres = getFormattedProp('–', 'genres', joinByCommas);

const getMovieCountries = getFormattedProp('–', 'countries', joinByCommas);

const getMovieDirectors = getFormattedProp('–', 'directors', joinByCommas);

const getMovieWriters = getFormattedProp('–', 'writers', joinByCommas);

const getMovieCast = getFormattedProp('–', 'cast', joinByCommas);

const getMoviePlot = getFormattedProp('', 'plot', identity);

const getMovieTMDbLink = getFormattedProp('', 'id', id => `https://www.themoviedb.org/movie/${id}`);

const getMovieIMDbLink = getFormattedProp('', 'IMDbId', id => `http://www.imdb.com/title/${id}`);

const getMovieLetterboxdLink = getFormattedProp('', 'IMDbId', id => `http://letterboxd.com/imdb/${id}`);

export const getMovieId = ({ id }) => id;

export const getMovieSummary = (movie) => {
  const title = getMovieTitle(movie);
  const releaseYear = getMovieReleaseYear(movie);

  return `${title}${releaseYear ? ` (${releaseYear})` : ''}`;
};

const getMovieFullTitle = (movie) => {
  const title = getMovieTitle(movie);
  const originalTitle = getMovieOriginalTitle(movie);

  return `*${title}*${originalTitle !== title ? `\n${originalTitle}` : ''}`;
};

export const getMovieDetails = (movie) => {
  const factsBlock = [
    joinBySpace([getMovieReleaseDate(movie), getMovieRuntime(movie), getMovieScore(movie)]),
    getMovieGenres(movie), getMovieCountries(movie),
  ];
  const castAndCrewBlock = [getMovieDirectors(movie), getMovieWriters(movie), getMovieCast(movie)];

  return joinByDoubleNewLine([
    getMovieFullTitle(movie),
    joinByNewLine(factsBlock),
    joinByNewLine(castAndCrewBlock),
    getMoviePlot(movie),
  ]);
};

export const getMovieExternalLinks = movie => [
  { text: 'TMDb', url: getMovieTMDbLink(movie) },
  { text: 'IMDb', url: getMovieIMDbLink(movie) },
  { text: 'Letterboxd', url: getMovieLetterboxdLink(movie) },
];

const getPersonName = getFormattedProp('', 'name', identity);

const getPersonBirthday = getFormattedProp('–', 'birthday', formatDate);

const getPersonDeathday = getFormattedProp('', 'deathday', formatDate);

const getPersonBirthAndDeath = (person) => {
  const birthday = getPersonBirthday(person);
  const deathday = getPersonDeathday(person);
  const age = getAge(person.birthday, person.deathday);

  return `${birthday}${deathday ? ` — ${deathday}` : ''} (age ${age})`;
};

const getPersonPlaceofBirth = getFormattedProp('–', 'placeOfBirth', identity);

const getPersonBiography = getFormattedProp('', 'biography', getStringBeforeChar('\n'));

const getPersonTMDbLink = getFormattedProp('', 'id', id => `https://www.themoviedb.org/person/${id}`);

const getPersonIMDbLink = getFormattedProp('', 'IMDbId', id => `http://www.imdb.com/name/${id}`);

export const getPersonId = ({ id }) => id;

export const getPersonSummary = person => getPersonName(person);

export const getPersonDetails = (person) => {
  const factsBlock = [getPersonBirthAndDeath(person), getPersonPlaceofBirth(person)];

  return joinByDoubleNewLine([
    `*${getPersonName(person)}*`,
    joinByNewLine(factsBlock),
    getPersonBiography(person),
  ]);
};

export const getPersonExternalLinks = movie => [
  { text: 'TMDb', url: getPersonTMDbLink(movie) },
  { text: 'IMDb', url: getPersonIMDbLink(movie) },
];
