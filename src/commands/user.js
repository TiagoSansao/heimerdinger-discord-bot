import axios from 'axios';
import getChampionName from '../utils/getChampionName.js';
import getRegionUrl from '../utils/getRegionUrl.js';
import {} from 'dotenv/config.js';

async function getUser(args, champions) {
  console.log(getRegionUrl(args[1]));
  const response = await axios
    .get(
      `${getRegionUrl(args[1])}/lol/summoner/v4/summoners/by-name/${
        args[0]
      }?api_key=${process.env.RIOT_API_KEY}`
    )
    .catch((err) => {
      console.log(err);
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

async function user(args, champions) {
  if (!user) return 'no args';
  const userData = await getUser(args, champions);
  if (!userData) return `not found`;
  return userData;
}

export default user;
