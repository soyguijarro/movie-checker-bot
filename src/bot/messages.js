import { getMovieDetails, getPersonDetails } from '../data/formatters';
import {
  getMovieDisambiguationButtons, getMovieExternalLinksButtons,
  getPersonDisambiguationButtons, getPersonExternalLinksButtons,
} from './buttons';
import { MESSAGES } from './constants';

const getInlineKeyboardParams = buttons => ({
  reply_markup: JSON.stringify({
    inline_keyboard: buttons,
  }),
});

const sendMessage = (bot, message, chatId, messageId, params = {}) => {
  const finalParams = { parse_mode: 'Markdown', ...params };

  if (messageId) return bot.editMessageText(chatId, messageId, message, finalParams);
  return bot.sendMessage(chatId, message, finalParams);
};

export const sendHelpMessage = (bot, chatId, messageId) =>
  sendMessage(bot, MESSAGES.help(), chatId, messageId);

export const sendErrorMessage = (bot, chatId, messageId) =>
  sendMessage(bot, MESSAGES.error(), chatId, messageId);

export const sendUnknownMessage = (bot, chatId, messageId) =>
  sendMessage(bot, MESSAGES.unknown(), chatId, messageId);

export const sendNoResultsMessage = (bot, query, chatId, messageId) =>
  sendMessage(bot, MESSAGES.noResults(query), chatId, messageId);

export const sendMovieDisambiguationMessage = (bot, movies, chatId, messageId) =>
  sendMessage(
    bot,
    MESSAGES.disambiguation('movie'),
    chatId, messageId,
    getInlineKeyboardParams(getMovieDisambiguationButtons(movies)),
  );

export const sendMovieDetailsMessage = (bot, movie, chatId, messageId) =>
  sendMessage(
    bot,
    getMovieDetails(movie),
    chatId, messageId,
    getInlineKeyboardParams([getMovieExternalLinksButtons(movie)]),
  );

export const sendPersonDisambiguationMessage = (bot, people, chatId, messageId) =>
  sendMessage(
    bot,
    MESSAGES.disambiguation('person'),
    chatId, messageId,
    getInlineKeyboardParams(getPersonDisambiguationButtons(people)),
  );

export const sendPersonDetailsMessage = (bot, person, chatId, messageId) =>
  sendMessage(
    bot,
    getPersonDetails(person),
    chatId, messageId,
    getInlineKeyboardParams([getPersonExternalLinksButtons(person)]),
  );
