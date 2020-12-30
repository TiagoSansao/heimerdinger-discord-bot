import lang from "../controllers/langHandler.js";
import { MessageEmbed } from "discord.js";

async function hextech(msg, possibilities) {
  let champions = possibilities[0];
  let plusDrop = "";
  possibilities = possibilities[lang(msg.guild, "LANGUAGE_INDEX")];
  let random = Math.random() * 100;
  let randomPlus = Math.random() * 100;
  console.log(random + "first");
  console.log(randomPlus + "plus");
  if (random >= 50 && random <= 75) {
    possibilities = champions;
  } else if (random >= 75 && random <= 85) {
    possibilities = "A random permanent emote.";
  } else if (random >= 85 && random <= 96.5) {
    possibilities = "A Ward Skin Shard + 150 Orange Essence.";
  } else if (random >= 96.5) {
    possibilities = "Summoner Icon Shard + 150 Orange Essence.";
  }
  if (randomPlus <= 3.6) {
    plusDrop = " + **Gemstone**";
  } else if (randomPlus > 3.6 && randomPlus < 13.6) {
    plusDrop = " + **Bonus Chest** + **Key**";
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
      }**${plusDrop}!`;
      const embed = new MessageEmbed();
      embed
        .setColor("#3498db")
        .setTitle("Hextech chest")
        .setThumbnail("https://i.imgur.com/aEJCdi7.png")
        .setDescription(
          "Check the real probabilities with **!h probabilities**"
        )
        .addFields(
          { name: "solo duo", value: "iron iv", inline: true },
          { name: "flex", value: "iron XV", inline: true }
        )
        .setImage(
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_2.jpg"
        )
        .setFooter(`Heimerdinger Bot - ${process.env.INVITE_LINK}`);
      message.edit("\u200B");
      message.edit(embed);
      return;
    }

    const textTxt = `${lang(
      msg.guild,
      "HEXTECH_FINAL"
    )} **${possibilities}** ${plusDrop}`;
    message.edit(textTxt);
  }, 3000);
}

export default hextech;
