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
        `${lang(msg.guild, "ROULETTE_FINAL")} **${possibilities[index]}**!`
      ),
    3000
  );
}

export default hextech;
