import axios from "axios";
import lang from "../controllers/langHandler.js";

export default function getAlmostStaticData() {
  let champions = [];
  let possibilitiesChampions = [];
  let possibilitiesSkinsAndChampions = [];

  axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/${"pt_BR"}/championFull.json`
    )
    .then((response) => {
      champions = response.data.data;
      for (let champion in champions) {
        possibilitiesSkinsAndChampions.push(champion);
        possibilitiesChampions.push(champion);
        champions[champion].skins.forEach((skinObj) => {
          if (skinObj.name === "default") return;
          possibilitiesSkinsAndChampions.push(skinObj.name);
        });
      }
    });
  return [possibilitiesChampions, possibilitiesSkinsAndChampions];
}
