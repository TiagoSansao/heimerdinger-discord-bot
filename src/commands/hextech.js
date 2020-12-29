import lang from "../controllers/langHandler.js";

async function hextech(msg, possibilities) {
  let champions = possibilities[0];
  possibilities = possibilities[lang(msg.guild, "LANGUAGE_INDEX")];
  console.log(possibilities);
  let random = Math.round(Math.random() * 100);
  console.log(random);
  if (random >= 50 && random <= 75) {
    possibilities = champions;
  } else if (random >= 75 && random <= 85) {
    possibilities = "A random permanent emote. (10% probability)";
  } else if (random >= 85 && random <= 96.5) {
    possibilities =
      "A Ward Skin Shard + 150 Orange Essence. (11.5% probability)";
  } else if (random >= 96.5) {
    possibilities =
      "Summoner Icon Shard + 150 Orange Essence. (3.5% probability)";
  }
  let message = await msg.channel.send(
    "**3** " + lang(msg.guild, "ROULETTE_SECOND")
  );
  setTimeout(
    () => message.edit("**2** " + lang(msg.guild, "ROULETTE_SECOND")),
    1000
  );
  setTimeout(
    () => message.edit("**1** " + lang(msg.guild, "ROULETTE_SECOND")),
    2000
  );
  setTimeout(() => {
    if (typeof possibilities === "object") {
      let index = Math.round(Math.random() * possibilities.length);
      const text = `${lang(msg.guild, "HEXTECH_FINAL")} **${
        possibilities[index]
      }**!`;
      return message.edit(text);
    }

    const textTxt = `${lang(msg.guild, "HEXTECH_FINAL")} **${possibilities}**`;
    return message.edit(textTxt);
  }, 3000);
}

//  Remember to change percentage to real ones, get it from:
// https://www.riftherald.com/lol-gameplay/2018/2/22/17041132/league-of-legends-loot-box-rates-hextech-crafting-riot-games

export default hextech;
