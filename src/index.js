import Discord from 'discord.js';
import axios from 'axios';
import {} from 'dotenv/config.js';
import getFreeWeek from './commands/freeweek.js';

const client = new Discord.Client();

const prefix = process.env.PREFIX;

let champions = {};

axios
  .get(
    'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json'
  )
  .then((response) => (champions = response.data.data));

client.on('ready', () => {
  console.log(`Logged as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'freeweek') {
    const freeChampions = await getFreeWeek(champions);
    return msg.channel.send(freeChampions);
  }
});

client.login(process.env.BOT_TOKEN);
