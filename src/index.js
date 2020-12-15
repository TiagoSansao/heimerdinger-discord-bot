import Discord from 'discord.js';
import axios from 'axios';
import {} from 'dotenv/config.js';

import getFreeWeek from './commands/freeweek.js';
import getUser from './commands/user.js';
import getServers from './commands/servers.js';
import getHelp from './commands/help.js';

const client = new Discord.Client();

const prefix = process.env.PREFIX;

let champions = {};

axios
  .get(
    'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json'
  )
  .then((response) => (champions = response.data.data));

client.on('ready', () => {
  client.user.setActivity('Type: ' + prefix + 'help', {
    type: 'PLAYING',
  });
  console.log(`Logged as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'help') return getHelp(msg, prefix);

  if (command === 'freeweek') return getFreeWeek(champions, msg);

  if (command === 'user') return getUser([args[0], args[1]], champions, msg);

  if (command === 'servers') return getServers(msg);
});

client.login(process.env.BOT_TOKEN);
