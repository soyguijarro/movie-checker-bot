import { getDetails } from '../data/formatters';
import { getDisambiguationButtons, getExternalLinksButtons } from './buttons';
import { MESSAGES } from './constants';

const getInlineKeyboardParams = buttons => ({
  reply_markup: JSON.stringify({
    inline_keyboard: buttons,
  }),
});

const sendMessage = (bot, message, chatId, messageId, params = {}) => {
  const finalParams = Object.assign({}, { parse_mode: 'Markdown' }, params);

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
    MESSAGES.disambiguation(),
    chatId, messageId,
    getInlineKeyboardParams(getDisambiguationButtons(movies)),
  );

export const sendMovieDetailsMessage = (bot, movie, chatId, messageId) =>
  sendMessage(
    bot,
    getDetails(movie),
    chatId, messageId,
    getInlineKeyboardParams([getExternalLinksButtons(movie)]),
  );
