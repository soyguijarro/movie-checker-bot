import {
  fetchMovieMatches, fetchMovieDetails, fetchPersonMatches, fetchPersonDetails,
} from '../data/fetchers';
import {
  sendHelpMessage, sendErrorMessage, sendUnknownMessage, sendNoResultsMessage,
  sendMovieDetailsMessage, sendMovieDisambiguationMessage,
  sendPersonDetailsMessage, sendPersonDisambiguationMessage,
} from './messages';
import { getMovieId, getPersonId } from '../data/formatters';
import { parseMovie, parsePerson } from '../data/parsers';
import { isPositiveInteger } from '../utils';

export const help = (bot, chatId) => sendHelpMessage(bot, chatId);

export const start = help;

export const unknown = (bot, chatId) => sendUnknownMessage(bot, chatId);

export const movieDetails = (bot, movieId, chatId, messageId) => {
  if (!movieId || !isPositiveInteger(movieId)) {
    return sendErrorMessage(bot, chatId, messageId);
  }

  return fetchMovieDetails(movieId)
    .then(parseMovie)
    .then(movie => sendMovieDetailsMessage(bot, movie, chatId, messageId))
    .catch(() => sendErrorMessage(bot, chatId, messageId));
};

export const movie = (bot, query, chatId) => {
  if (!query || !query.length) return sendErrorMessage(bot, chatId);

  return fetchMovieMatches(query)
    .then(movies => movies.map(parseMovie))
    .then((movies) => {
      if (!movies.length) return sendNoResultsMessage(bot, query, chatId);
      if (movies.length > 1) return sendMovieDisambiguationMessage(bot, movies, chatId);
      return movieDetails(bot, getMovieId(movies[0]), chatId);
    })
    .catch(() => sendErrorMessage(bot, chatId));
};

export const personDetails = (bot, personId, chatId, messageId) => {
  if (!personId || !isPositiveInteger(personId)) {
    return sendErrorMessage(bot, chatId, messageId);
  }

  return fetchPersonDetails(personId)
    .then(parsePerson)
    .then(person => sendPersonDetailsMessage(bot, person, chatId, messageId))
    .catch(() => sendErrorMessage(bot, chatId, messageId));
};

export const person = (bot, query, chatId) => {
  if (!query || !query.length) return sendErrorMessage(bot, chatId);

  return fetchPersonMatches(query)
    .then(people => people.map(parsePerson))
    .then((people) => {
      if (!people.length) return sendNoResultsMessage(bot, query, chatId);
      if (people.length > 1) return sendPersonDisambiguationMessage(bot, people, chatId);
      return personDetails(bot, getPersonId(people[0]), chatId);
    })
    .catch(() => sendErrorMessage(bot, chatId));
};
