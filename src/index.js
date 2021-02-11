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

  const freeweekAlias = ['freeweek', 'fw'];
  if (freeweekAlias.includes(command)) return getFreeWeek(possiblities[0], msg);

  const userAlias = ['user', 'usuario', 'player'];
  if (userAlias.includes(command))
    return getUser([args[0], args[1]], possiblities[0], msg);

  const serverAlias = ['servers', 'servidores', 'regions', 'regioes'];
  if (serverAlias.includes(command)) return getServers(msg);

  const championAlias = ['campeao', 'champion'];
  if (championAlias.includes(command))
    return getChampion(msg, args[0], args[1], emojiCache);

  const rouletteAlias = ['roulette', 'roleta'];
  if (rouletteAlias.includes(command)) return getRoulette(msg, possiblities[0]);

  const hextechAlias = ['hextech'];
  if (hextechAlias.includes(command)) return getHextech(msg, possiblities);

  const languageAlias = ['language', 'idioma'];
  if (languageAlias.includes(command)) {
    await setLanguage(msg, args[0], prefix);
    await loadLanguages(client);
    return;
  } else return msg.channel.send(lang(msg.guild, 'COMMAND_NOT_FOUND'));
});

client.login(process.env.BOT_TOKEN);
