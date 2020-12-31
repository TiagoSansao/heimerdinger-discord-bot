import lang from "../controllers/langHandler.js";
import { MessageEmbed } from "discord.js";

async function roulette(msg, championsArray) {
  let index = Math.round(Math.random() * championsArray.length);
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
    const text = `${lang(msg.guild, "ROULETTE_FINAL")} **${
      championsArray[index].name
    }**!`;
    const embed = new MessageEmbed();
    embed
      .setColor("#3498db")
      .setTitle(lang(msg.guild, "ROULETTE_TITLE"))
      .setThumbnail("https://i.imgur.com/aEJCdi7.png")
      .addField("\u200B", text)
      .setImage(
        `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championsArray[index].name}_0.jpg`
      )
      .setFooter(`Heimerdinger Bot - ${process.env.INVITE_LINK}`);
    message.edit("\u200B");
    message.edit(embed);
  }, 3000);
}

export default roulette;
