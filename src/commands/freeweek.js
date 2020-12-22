import Discord from 'discord.js';
import axios from 'axios';
import getChampionName from '../utils/getChampionName.js';
import lang from '../controllers/langHandler.js';
import {} from 'dotenv/config.js';

async function getFreeWeek(champions, msg) {
  const response = await axios
    .get(
      `${process.env.BASE_URL}/lol/platform/v3/champion-rotations?api_key=${process.env.RIOT_API_KEY}`
    )
    .catch(() => msg.channel.send(lang(msg.guild, 'SOMETHING_WENT_WRONG')));
  if (!response)
    return msg.channel.send(lang(msg.guild, 'SOMETHING_WENT_WRONG'));
  const FWChampions = response.data.freeChampionIds.map((id) =>
    getChampionName(id, champions)
  );
  const embed = new Discord.MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle('Free Week')
    .setDescription(lang(msg.guild, 'FREEWEEK_DESCRIPTION'))
    .setThumbnail('https://i.imgur.com/aEJCdi7.png')
    .addField('Champions', FWChampions.join(', '))
    .addField(
      'Heimerdinger Bot',
      `[${lang(
        msg.guild,
        'ADD_TO_SERVER'
      )}](https://rebrand.ly/heimerdinger-bot)`
    );

  return msg.channel.send(embed);
}

export default getFreeWeek;
