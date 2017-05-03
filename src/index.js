import Slimbot from 'slimbot';

import { onMessage, onCallbackQuery } from './bot/events';
import { TELEGRAM_TOKEN } from './bot/constants';

const bot = new Slimbot(TELEGRAM_TOKEN);

bot.on('message', onMessage(bot));
bot.on('callback_query', onCallbackQuery(bot));

bot.startPolling();
