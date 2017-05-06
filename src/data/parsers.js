import {
  isDateValid, isPositiveInteger, isWithinRange, doStringsMatch, filterArrayDuplicates,
} from '../utils';
import { PROPS_SETTINGS, PROPS_CONSTANTS } from './constants';

const { SCORE_DECIMALS, MAX_ACTORS_TO_SHOW } = PROPS_SETTINGS;
const { MIN_SCORE, MAX_SCORE } = PROPS_CONSTANTS;

const parseDate = date => (isDateValid(date) ? new Date(date) : null);

const parseCountries = (countries = []) => countries.map(country => country.name);

const parseRuntime = runtime => (isPositiveInteger(runtime) ? runtime : null);

const isInOneToTenScale = isWithinRange(MIN_SCORE, MAX_SCORE);
const parseScore = score => (isInOneToTenScale(score) ? score.toFixed(SCORE_DECIMALS) : null);

const parseGenres = (genres = []) => genres.map(genre => genre.name);

const parseCrew = (crew = []) => {
  const directors = crew
    .filter(member => doStringsMatch(member.job, 'director'))
    .map(director => director.name);

  const writers = filterArrayDuplicates(crew
    .filter(member => doStringsMatch(member.department, 'writing'))
    .map(writer => writer.name));

  return { directors, writers };
};

const parseCast = (cast = []) =>
  cast
    .slice(0, MAX_ACTORS_TO_SHOW)
    .map(actor => actor.name);

export const parseMovie = ({
  id,
  imdb_id: IMDbId,
  title,
  original_title: originalTitle,
  release_date: releaseDate,
  production_countries: countries,
  runtime,
  vote_average: score,
  genres,
  crew,
  cast,
  overview: plot,
}) => Object.assign(
  {
    id,
    IMDbId,
    title,
    originalTitle,
    releaseDate: parseDate(releaseDate),
    countries: parseCountries(countries),
    runtime: parseRuntime(runtime),
    score: parseScore(score),
    genres: parseGenres(genres),
    cast: parseCast(cast),
    plot,
  },
  parseCrew(crew),
);

export const parsePerson = ({
  id,
  imdb_id: IMDbId,
  name,
  birthday,
  deathday,
  place_of_birth: placeOfBirth,
  biography,
}) => ({
  id,
  IMDbId,
  name,
  birthday: parseDate(birthday),
  deathday: parseDate(deathday),
  placeOfBirth,
  biography,
});
