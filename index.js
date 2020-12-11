import Discord from 'discord.js';
import axios from 'axios';

const client = new Discord.Client();

async function getFreeWeek() {
  const response = await axios.get(
    'https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-3f04dbf7-7ccf-4895-8eab-42d4d284236f'
  );
  if (!response) return 'Something went wrong, try again later.';
  return response.data.freeChampionIds;
}
console.log(getFreeWeek());

client.on('ready', () => {
  console.log(`Logged as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  if (msg.content === '!freeweek') {
    const freeChampions = await getFreeWeek();
    return msg.channel.send(freeChampions);
  }
});

client.login('Nzg1NTMyMDc1MzM1MDkwMTc2.X85NwQ.ou9VYtjUrI4hAh-fBj2eMmZe-f8');
