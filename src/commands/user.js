import axios from 'axios';
import getChampionName from '../utils/getChampionName.js';
import {} from 'dotenv/config.js';

async function getUser(user, champions) {
  const response = await axios
    .get(
      `${process.env.BASE_URL}/lol/summoner/v4/summoners/by-name/${user}?api_key=${process.env.RIOT_API_KEY}`
    )
    .catch(() => {
      return null;
    });
  if (!response) return null;
  const championMasteryUrl = `${process.env.BASE_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${response.data['id']}?api_key=${process.env.RIOT_API_KEY}`;
  const totalMasteryUrl = `${process.env.BASE_URL}/lol/champion-mastery/v4/scores/by-summoner/${response.data['id']}?api_key=${process.env.RIOT_API_KEY}`;

  await Promise.all([
    axios.get(championMasteryUrl),
    axios.get(totalMasteryUrl),
  ]).then(async (masteries) => {
    console.log(masteries[0].data[0]);
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
    response.data.mainChampion = mains;
    console.log(response.data);
  });
  return response.data;
}

async function user(user, champions) {
  if (!user) return 'no args';
  const userData = await getUser(user, champions);
  if (!userData) return `not found`;
  return userData;
}

export default user;
