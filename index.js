import Discord from 'discord.js';
import axios from 'axios';
import {} from 'dotenv/config.js';

const client = new Discord.Client();

let champions = {};

axios
  .get(
    'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json'
  )
  .then((response) => (champions = response.data.data));

// coloca o request dentro da funçã ode pegar nome, foda-se

function getChampionName(id) {
  for (let champion in champions) {
    if (parseInt(champions[champion].key) === id) {
      return champions[champion].name;
    }
  }
}

async function getFreeWeek() {
  const response = await axios.get(
    `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.RIOT_API_KEY}`
  );
  if (!response) return 'Something went wrong, try again later.';
  const FWChampions = response.data.freeChampionIds.map((id) =>
    getChampionName(id)
  );
  return FWChampions;
}

client.on('ready', () => {
  console.log(`Logged as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  if (msg.content === '!freeweek') {
    const freeChampions = await getFreeWeek();
    return msg.channel.send(freeChampions);
  }
});

client.login(process.env.BOT_TOKEN);
