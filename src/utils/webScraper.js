import axios from 'axios';

async function scraper(url) {
  const { data: response } = await axios.get(url);
  const regEx = /<h2>([a-zA-Z]+)<\/h2>/gm;
  console.log(regEx);
  const matchs = regEx.exec(response);
  console.log(matchs[1]);
}

scraper('https://www.leagueofgraphs.com/champions/builds/garen');
