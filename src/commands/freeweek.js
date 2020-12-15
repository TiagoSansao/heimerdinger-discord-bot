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
  const text = `Champions to play for free during this week:\n${FWChampions.join(
    ', '
  )}`;
  return msg.channel.send(text);
}

export default getFreeWeek;
