import axios from 'axios';
import discord from 'discord.js';
import getChampionName from '../utils/getChampionName.js';
import getRegionUrl from '../utils/getRegionUrl.js';
import {} from 'dotenv/config.js';

async function getUser(args, champions) {
  const response = await axios
    .get(
      `${getRegionUrl(args[1])}/lol/summoner/v4/summoners/by-name/${
        args[0]
      }?api_key=${process.env.RIOT_API_KEY}`
    )
    .catch((err) => {
      return null;
    });
  if (!response) return null;
  const championMasteryUrl = `${getRegionUrl(
    args[1]
  )}/lol/champion-mastery/v4/champion-masteries/by-summoner/${
    response.data['id']
  }?api_key=${process.env.RIOT_API_KEY}`;
  const totalMasteryUrl = `${getRegionUrl(
    args[1]
  )}/lol/champion-mastery/v4/scores/by-summoner/${
    response.data['id']
  }?api_key=${process.env.RIOT_API_KEY}`;
  const eloUrl = `${getRegionUrl(args[1])}/lol/league/v4/entries/by-summoner/${
    response.data['id']
  }?api_key=${process.env.RIOT_API_KEY}`;

  await Promise.all([
    axios.get(championMasteryUrl),
    axios.get(totalMasteryUrl),
    axios.get(eloUrl),
  ]).then(async (masteries) => {
    response.data.totalMastery = masteries[1].data;
    const mains = [];
    for (let i = 0; i < 3; i += 1) {
      let data = await getChampionName(
        masteries[0].data[i].championId,
        champions
      );
      data = [
        data,
        masteries[0].data[i].championLevel,
        masteries[0].data[i].championPoints,
      ];
      mains.push(data);
    }
    const totalMasteryPoints = masteries[0].data.reduce((acc, champ) => {
      return acc + parseInt(champ.championPoints);
    }, 0);
    response.data.totalMasteryPoints = totalMasteryPoints;
    response.data.elo = masteries[2].data;
    response.data.mainChampion = mains;
    response.data.server = getRegionUrl(args[1])
      .split('//')[1]
      .match(/.*[0-9]/gi)[0];
  });
  return response.data;
}

async function user(args, champions, msg) {
  if (!args[0])
    return msg.channel.send(
      `${msg.author}, you need to give a name and a server (server is optional) \nStructure: ${prefix}user <name> <server>   |   Example: ${prefix}user faker KR`
    );
  const userData = await getUser(args, champions);
  if (!userData) return msg.channel.send(`User ${args[0]} was not found!`);
  const imgUrl = `http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/${userData.profileIconId}.png`;
  // msg.channel.send(
  //   `Data found:\nServer: ${userData.server}\nName: ${userData.name}\nLevel: ${
  //     userData.summonerLevel
  //   }\nTotal mastery: ${userData.totalMastery}\n${userData.elo
  //     .map(
  //       (mode) =>
  //         `Elo: ${mode.tier} ${mode.rank}, wins: ${mode.wins}, losses: ${mode.losses} (${mode.queueType})`
  //     )
  //     .join('\n')}\n${userData.mainChampion
  //     .map(
  //       (champ) =>
  //         `Main: ${champ[0]}, Mastery level: ${champ[1]}, Mastery points: ${champ[2]}`
  //     )
  //     .join('\n')}\nIcon:`,
  //   { files: [imgUrl] }
  // );

  const embed = new discord.MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle(userData.name)
    .setDescription('Server: ' + userData.server)
    .setThumbnail(imgUrl)
    .addField('Level', userData.summonerLevel)
    .addField('\u200B', '\u200B')
    .addFields(
      {
        name: 'Total mastery level',
        value: userData.totalMastery,
        inline: true,
      },
      {
        name: 'Total mastery points',
        value: userData.totalMasteryPoints,
        inline: true,
      }
    )
    .addField('\u200B', '\u200B');
  userData.elo.forEach((mode) => {
    embed.addFields(
      {
        name: mode.queueType,
        value: `${mode.tier} ${mode.rank}`,
        inline: true,
      },
      { name: 'Wins', value: mode.wins, inline: true },
      { name: 'Losses', value: mode.losses, inline: true }
    );
  });

  embed.addField('\u200B', '\u200B');
  userData.mainChampion.forEach((champ, index) => {
    // `Main: ${champ[0]}, Mastery level: ${champ[1]}, Mastery points: ${champ[2]}`
    embed.addFields(
      {
        name: 'Main champion ' + (index + 1) + 'º',
        value: champ[0],
        inline: true,
      },
      { name: 'Mastery level', value: champ[1], inline: true },
      { name: 'Mastery points', value: champ[2], inline: true }
    );
  });

  embed.setTimestamp().setFooter('Heimerdinger Bot - link');

  msg.channel.send(embed);
}

export default user;
