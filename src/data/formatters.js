import {
  formatDate, formatYear, formatMoney, getPercentageGain, getAge, joinArrayBy,
  truncateString, sanitizeString, identity,
} from '../utils';
import { PROPS_FORMATTERS, PROPS_SETTINGS } from './constants';

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

const getMovieRevenue = getFormattedProp('–', 'revenue', formatMoney);

const getMovieBudget = getFormattedProp('', 'budget', formatMoney);

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

const getMovieRelativeProfit = movie =>
  (movie.budget && movie.revenue ? getPercentageGain(movie.budget, movie.revenue) : null);
const getMovieMoney = (movie) => {
  const revenue = getMovieRevenue(movie);
  const budget = getMovieBudget(movie);
  const relativeProfit = getMovieRelativeProfit(movie);

  return `${revenue}${budget ? ` over ${budget}` : ''}${relativeProfit ? ` (${relativeProfit})` : ''}`;
};

export const getMovieDetails = (movie) => {
  const factsBlock = [
    joinBySpace([getMovieReleaseDate(movie), getMovieRuntime(movie), getMovieScore(movie)]),
    getMovieMoney(movie), getMovieGenres(movie), getMovieCountries(movie),
  ];
  const castAndCrewBlock = [getMovieDirectors(movie), getMovieWriters(movie), getMovieCast(movie)];

  return joinByDoubleNewLine([
    getMovieFullTitle(movie),
    joinByNewLine(factsBlock),
    joinByNewLine(castAndCrewBlock),
    getMoviePlot(movie),
  ]);
};

export const getMovieExternalLinks = (movie) => {
  const TMDbLink = getMovieTMDbLink(movie);
  const IMDBLink = getMovieIMDbLink(movie);
  const letterboxdLink = getMovieLetterboxdLink(movie);

  const externalLinks = [{ text: 'TMDb', url: TMDbLink }];
  if (IMDBLink) externalLinks.push({ text: 'IMDb', url: IMDBLink });
  if (letterboxdLink) externalLinks.push({ text: 'Letterboxd', url: letterboxdLink });

  return externalLinks;
};

const getPersonName = getFormattedProp('', 'name', identity);

const getPersonBirthday = getFormattedProp('–', 'birthday', formatDate);

const getPersonDeathday = getFormattedProp('', 'deathday', formatDate);

const getPersonAge = person => (person.birthday ? getAge(person.birthday, person.deathday) : null);
const getPersonBirthAndDeath = (person) => {
  const birthday = getPersonBirthday(person);
  const deathday = getPersonDeathday(person);
  const age = getPersonAge(person);

  return `${birthday}${deathday ? ` — ${deathday}` : ''}${age ? ` (age ${age})` : ''}`;
};

const getPersonPlaceofBirth = getFormattedProp('–', 'placeOfBirth', identity);

const sanitizeBiography = sanitizeString(...PROPS_SETTINGS.BIOGRAPHY_REMOVALS);
const getPersonBiography = getFormattedProp('', 'biography',
  text => truncateString(PROPS_SETTINGS.MAX_BIOGRAPHY_LENGTH)(sanitizeBiography(text)),
);

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

export const getPersonExternalLinks = (movie) => {
  const TMDbLink = getPersonTMDbLink(movie);
  const IMDBLink = getPersonIMDbLink(movie);

  const externalLinks = [{ text: 'TMDb', url: TMDbLink }];
  if (IMDBLink) externalLinks.push({ text: 'IMDb', url: getPersonIMDbLink(movie) });

  return externalLinks;
};
