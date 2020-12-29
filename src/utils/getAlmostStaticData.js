import axios from "axios";

export default async function getAlmostStaticData() {
  let champions = [];
  let possibilitiesChampions = [];
  let possibilitiesSkinsAndChampions = [];

  function Url(language) {
    this.link = `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/${language}/championFull.json`;
  }

  await Promise.all([
    axios.get(new Url("en_US").link),
    axios.get(new Url("pt_BR").link),
  ]).then((response) => {
    console.log("oi");
    response.forEach((res, i) => {
      possibilitiesSkinsAndChampions.push([]);
      champions = res.data.data;
      for (let champion in champions) {
        if (i === 0) possibilitiesChampions.push(champion);
        possibilitiesSkinsAndChampions[i].push(champion);
        champions[champion].skins.forEach((skinObj) => {
          if (skinObj.name === "default") return;
          possibilitiesSkinsAndChampions[i].push(skinObj.name);
        });
      }
    });
  });
  return [
    possibilitiesChampions,
    possibilitiesSkinsAndChampions[0],
    possibilitiesSkinsAndChampions[1],
  ];
}
