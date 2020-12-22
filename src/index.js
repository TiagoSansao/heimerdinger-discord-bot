import Discord from 'discord.js';
import axios from 'axios';
import {} from 'dotenv/config.js';

import getFreeWeek from './commands/freeweek.js';
import getUser from './commands/user.js';
import getServers from './commands/servers.js';
import getChampion from './commands/champion.js';
import getHelp from './commands/help.js';
import setLanguage from './commands/language.js';

import lang, { loadLanguages } from './controllers/langHandler.js';
import messageWhenJoin from './controllers/messageWhenJoin.js';

const client = new Discord.Client();

const prefix = '!h ';

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
  loadLanguages(client);
  console.log(`Logged as ${client.user.tag}`);
});

messageWhenJoin(client);

client.on('message', async (msg) => {
  if (!msg.content.startsWith('!h') || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'help' || command === 'ajuda') return getHelp(msg, prefix);

  if (command === 'freeweek') return getFreeWeek(champions, msg);

  if (command === 'user' || command === 'usuario')
    return getUser([args[0], args[1]], champions, msg);

  if (command === 'servers' || command === 'servidores') return getServers(msg);

  if (command === 'embed') {
    const embed = new Discord.MessageEmbed();
    embed
      .setColor('#3498db')
      .setTitle('Name')
      .setThumbnail('https://i.imgur.com/aEJCdi7.png')
      .setDescription('Server')
      .addFields(
        { name: 'solo duo', value: 'iron iv', inline: true },
        { name: 'flex', value: 'iron XV', inline: true }
      )
      .setTimestamp()
      .setFooter('Heimerdinger Bot - link');

    msg.channel.send(embed);
  }

  if (command === 'champion' || command === 'campeao')
    return getChampion(msg, args[0], args[1]);

  if (command === 'language' || command === 'idioma') {
    await setLanguage(msg, args[0], prefix);
    await loadLanguages(client);
    return;
  } else return msg.channel.send(lang(msg.guild, 'COMMAND_NOT_FOUND'));
});

client.login(process.env.BOT_TOKEN);
