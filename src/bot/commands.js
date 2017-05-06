import { fetchMovieMatches, fetchMovieDetails } from '../data/fetchers';
import {
  sendHelpMessage, sendErrorMessage, sendUnknownMessage, sendNoResultsMessage,
  sendMovieDetailsMessage, sendMovieDisambiguationMessage,
} from './messages';
import { getId } from '../data/formatters';
import { parseMovie } from '../data/parsers';
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
      return movieDetails(bot, getId(movies[0]), chatId);
    })
    .catch(() => sendErrorMessage(bot, chatId));
};

