import Discord, { Message } from 'discord.js';
import axios from 'axios';
import {} from 'dotenv/config.js';
import getFreeWeek from './commands/freeweek.js';
import getUser from './commands/user.js';

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

  if (command === 'help') {
    const help = `Hello, here are my commands, use it wisely.\n${prefix}freeweek - shows all the champions that are free to play this week.\n${prefix}user <name> <server> - shows data about the user given.\n${prefix}servers - shows all the servers' acronyms that are used to find a user.\n${prefix}help - shows all the commands, you are looking at it now.`;
    msg.react('👍');
    msg.author.send(help);
  }

  if (command === 'freeweek') {
    try {
      const freeChampions = await getFreeWeek(champions);
      return msg.channel.send(freeChampions);
    } catch (e) {
      return msg.channel.send('Error, this bug will be fixed soon.');
    }
  }

  if (command === 'user') {
    const user = await getUser([args[0], args[1]], champions);
    if (user === 'no args')
      return msg.channel.send(
        `${msg.author}, you need to give a name and a server (server is optional) \nStructure: ${prefix}user <name> <server>   |   Example: ${prefix}user faker KR`
      );
    else if (user === 'not found')
      return msg.channel.send(`User ${args[0]} was not found!`);
    const imgUrl = `http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/${user.profileIconId}.png`;
    return msg.channel.send(
      `Data found:\nServer: ${user.server}\nName: ${user.name}\nLevel: ${
        user.summonerLevel
      }\nTotal mastery: ${user.totalMastery}\n${user.mainChampion
        .map(
          (champ) =>
            `Main: ${champ[0]}, Mastery level: ${champ[1]}, Mastery points: ${champ[2]}`
        )
        .join('\n')}\nIcon:`,
      { files: [imgUrl] }
    );
  }

  if (command === 'servers') {
    msg.channel.send(
      'List of servers: \n| BR - Brazil | NA - North America | EUN - Europe Nordic & East | EUW - Europe West | LA1 - Latin America North | LA2 - Latin America  South | OC - Oceania | RU - Russia | TR - Turkey | JP - Japan |'
    );
  }
});

client.login(process.env.BOT_TOKEN);

// make find user function, flags: user, region
//default region is NA1
