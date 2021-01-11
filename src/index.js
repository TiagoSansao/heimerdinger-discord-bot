import Discord from 'discord.js';
import {} from 'dotenv/config.js';

import getFreeWeek from './commands/freeweek.js';
import getUser from './commands/user.js';
import getServers from './commands/servers.js';
import getChampion from './commands/champion.js';
import getHelp from './commands/help.js';
import setLanguage from './commands/language.js';
import getRoulette from './commands/roulette.js';
import getHextech from './commands/hextech.js';
import getAlmostStaticData from './utils/getAlmostStaticData.js';

import lang, { loadLanguages } from './controllers/langHandler.js';
import messageWhenJoin from './controllers/messageWhenJoin.js';
import getAssets from './controllers/getAssets.js';

const client = new Discord.Client();

const prefix = '!h ';

let possiblities, emojiCache;

client.on('ready', async () => {
  client.user.setActivity('!h help | !h language', {
    type: 'PLAYING',
  });
  possiblities = await getAlmostStaticData();
  emojiCache = await getAssets(client.guilds);
  loadLanguages(client);
  messageWhenJoin(client);
  console.log(`Logged as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  if (
    (!msg.content.startsWith('!h') && !msg.content.startsWith('!H')) ||
    msg.author.bot
  )
    return;
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  const helpAlias = ['help', 'ajuda', 'commands', 'comandos'];
  if (helpAlias.includes(command)) return getHelp(msg, prefix);

  if (command === 'freeweek') return getFreeWeek(champions, msg);

  if (command === 'user' || command === 'usuario')
    return getUser([args[0], args[1]], champions, msg);

  if (command === 'servers' || command === 'servidores') return getServers(msg);

  if (command === 'champion' || command === 'campeao')
    return getChampion(msg, args[0], args[1], emojiCache);

  if (command === 'roulette' || command === 'roleta')
    return getRoulette(msg, possiblities[0]);

  if (command === 'hextech') return getHextech(msg, possiblities);

  if (command === 'language' || command === 'idioma') {
    await setLanguage(msg, args[0], prefix);
    await loadLanguages(client);
    return;
  } else return msg.channel.send(lang(msg.guild, 'COMMAND_NOT_FOUND'));
});

client.login(process.env.BOT_TOKEN);
