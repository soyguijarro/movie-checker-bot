import { joinArrayBy } from '../utils';

const joinByNewLine = joinArrayBy('\n');
const joinByDoubleNewLine = joinArrayBy('\n\n');

export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

export const MESSAGES = {
  help: () => joinByDoubleNewLine([
    '📽 *Movie Checker*',
    'This bot helps you quickly check basic movie info, such as release date, runtime or cast and crew members. You\'ll also get links to external websites for additional details.',
    joinByNewLine([
      '• Type /movie followed by a movie title to see basic info about it.',
      '• Type /help at any time to read these instructions again.',
    ]),
    'Please note release dates and any other region-specific details correspond to the US at the moment.',
    '_This product uses the TMDb API but is not endorsed or certified by TMDb._',
  ]),
  error: () => '😓 Sorry, something went wrong. Please try again.',
  unknown: () => '😕 Unknown command. Type /help for instructions on how to use this bot.',
  noResults: query => `😞 Sorry, no movies for *${query}*.`,
  disambiguation: () => '🤔 Which movie do you mean?',
};
