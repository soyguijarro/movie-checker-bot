import { start, help, unknown, search, details } from './commands';
import { joinArrayBy } from '../utils';

const joinBySpace = joinArrayBy(' ');

const parseUserInput = (string) => {
  const [commandString, ...queryArray] = string.split(' ');

  const command = commandString.replace('/', '');
  const query = joinBySpace(queryArray);
  return { command, query };
};

const getMessageMetadata = ({ chat: { id: chatId }, message_id: messageId }) => ({
  chatId, messageId,
});

export const onMessage = bot => (message) => {
  const { command, query } = parseUserInput(message.text);
  const { chatId } = getMessageMetadata(message);

  if (command === 'start') return start(bot, chatId);
  if (command === 'help') return help(bot, chatId);
  if (command === 'search') return search(bot, query, chatId);
  return unknown(bot, chatId);
};

export const onCallbackQuery = bot => ({ data, message }) => {
  const { command, query } = parseUserInput(data);
  const { chatId, messageId } = getMessageMetadata(message);

  if (command === 'details') return details(bot, query, chatId, messageId);
  return null;
};
