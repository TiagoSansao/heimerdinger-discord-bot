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
        `${msg.author}, you need to give a name. \nExample:  ${prefix}user faker`
      );
    else if (user === 'not found')
      return msg.channel.send(`User ${args[0]} was not found!`);
    const imgUrl = `http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/${user.profileIconId}.png`;
    return msg.channel.send(
      `Data found:\nName: ${user.name}\nLevel: ${
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
});

client.login(process.env.BOT_TOKEN);

// make find user function, flags: user, region
//default region is NA1
