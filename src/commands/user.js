import axios from 'axios';

async function getUser(user) {
  const response = await axios
    .get(
      `${process.env.BASE_URL}/lol/summoner/v4/summoners/by-name/${user}?api_key=${process.env.RIOT_API_KEY}`
    )
    .catch((err) => {
      return null;
    });
  if (!response) return null;
  return response.data;
}

async function user(user) {
  if (!user) return 'no args';
  const userData = await getUser(user);
  if (!userData) return `not found`;
  return userData;
}

export default user;
