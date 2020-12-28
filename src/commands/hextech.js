import lang from "../controllers/langHandler.js";

async function hextech(msg, possibilities) {
  let index = Math.round(Math.random() * possibilities.length);
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
  setTimeout(
    () =>
      message.edit(
        `${lang(msg.guild, "HEXTECH_FINAL")} **${possibilities[index]}**!`
      ),
    3000
  );
}

//  Remember to change percentage to real ones, get it from:
// https://www.riftherald.com/lol-gameplay/2018/2/22/17041132/league-of-legends-loot-box-rates-hextech-crafting-riot-games

export default hextech;
