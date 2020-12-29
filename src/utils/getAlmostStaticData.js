import axios from "axios";

export default function getAlmostStaticData() {
  let champions = [];
  let possibilitiesChampions = [];
  let possibilitiesSkinsAndChampions = [];
  let possibilitiesSkinsAndChampionsPortuguese = [];

  function Url(language) {
    this.link = `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/${language}/championFull.json`;
  }
  Promise.all([
    axios.get(new Url("en_US").link),
    axios.get(new Url("pt_BR").link),
  ]).then((response) => {
    response.forEach((res) => {
      champions = res.data.data;
      for (let champion in champions) {
        possibilitiesSkinsAndChampions.push(champion);
        possibilitiesChampions.push(champion);
        champions[champion].skins.forEach((skinObj) => {
          if (skinObj.name === "default") return;
          possibilitiesSkinsAndChampions.push(skinObj.name);
        });
      }
    });
  });
  return [possibilitiesChampions, possibilitiesSkinsAndChampions];
}
