import Discord from 'discord.js';
import axios from 'axios';
import getChampionName from '../utils/getChampionName.js';
import {} from 'dotenv/config.js';

async function getFreeWeek(champions, msg) {
  const response = await axios.get(
    `${process.env.BASE_URL}/lol/platform/v3/champion-rotations?api_key=${process.env.RIOT_API_KEY}`
  );
  if (!response) return 'Something went wrong, try again later.';
  const FWChampions = response.data.freeChampionIds.map((id) =>
    getChampionName(id, champions)
  );
  const embed = new Discord.MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle('Free Week')
    .setDescription('Champions to play for free during this week')
    .setThumbnail('https://i.imgur.com/aEJCdi7.png')
    .addField('Champions', FWChampions.join(', '))
    .setTimestamp()
    .setFooter('Heimerdinger Bot - link');

  return msg.channel.send(embed);
}

export default getFreeWeek;
