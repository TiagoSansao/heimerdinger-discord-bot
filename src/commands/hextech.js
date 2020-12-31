import lang from "../controllers/langHandler.js";
import { MessageEmbed } from "discord.js";

async function hextech(msg, possibilities) {
  let champions = possibilities[0];
  let plusDrop = "";
  let emoteWardIcon;
  possibilities = possibilities[lang(msg.guild, "LANGUAGE_INDEX")];
  let random = Math.random() * 100;
  let randomPlus = Math.random() * 100;
  if (random >= 50 && random <= 75) {
    possibilities = champions;
  } else if (random >= 75 && random <= 85) {
    possibilities = "A random permanent emote.";
    emoteWardIcon =
      "https://nexus.leagueoflegends.com/wp-content/uploads/2017/08/LOL_CMS_117_Article_00.jpg";
  } else if (random >= 85 && random <= 96.5) {
    possibilities = "A Ward Skin Shard + 150 Orange Essence.";
    emoteWardIcon =
      "https://www.clipartmax.com/png/middle/283-2835845_victorious-ward-league-of-legends.png";
  } else if (random >= 96.5) {
    possibilities = "Summoner Icon Shard + 150 Orange Essence.";
    emoteWardIcon =
      "https://cdnb.artstation.com/p/assets/images/images/012/033/999/large/thomas-randby-npe-ahri.jpg?1532668669";
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
      const text = `${lang(msg.guild, "HEXTECH_FINAL")}\n**${
        possibilities[index].name
      }**${plusDrop}!`;
      const embed = new MessageEmbed();
      embed
        .setColor("#3498db")
        .setTitle("Hextech Chest")
        .setThumbnail(
          "https://static.wikia.nocookie.net/leagueoflegends/images/6/60/Hextech_Crafting_Chest.png/revision/latest/scale-to-width-down/340?cb=20191203123712"
        )
        .addField("\u200B", text)
        .setImage(
          `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${possibilities[index].championName}_${possibilities[index].number}.jpg`
        )
        .setFooter(`Heimerdinger Bot - ${process.env.INVITE_LINK}`);
      message.edit("\u200B");
      message.edit(embed);
      return;
    }

    const textTxt = `${lang(
      msg.guild,
      "HEXTECH_FINAL"
    )}\n**${possibilities}** ${plusDrop}`;
    const embedTxt = new MessageEmbed();
    embedTxt
      .setColor("#3498db")
      .setTitle("Hextech Chest")
      .setThumbnail(
        "https://static.wikia.nocookie.net/leagueoflegends/images/6/60/Hextech_Crafting_Chest.png/revision/latest/scale-to-width-down/340?cb=20191203123712"
      )
      .addField("\u200B", textTxt)
      .setImage(emoteWardIcon)
      .setFooter(`Heimerdinger Bot - ${process.env.INVITE_LINK}`);
    message.edit("\u200B");
    message.edit(embedTxt);
  }, 3000);
}

export default hextech;
