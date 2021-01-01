import { MessageEmbed } from "discord.js";
import lang from "./langHandler.js";

function messageWhenJoining(client) {
  client.on("guildCreate", (guild) => {
    let channelTarget;
    guild.channels.cache.forEach((channel) => {
      if (channel.type === "text" && !channelTarget) {
        channelTarget = channel;
      }
    });
    let embed = new MessageEmbed();
    embed
      .setColor("#3498db")
      .setTitle("Heimerdinger Bot")
      .setDescription("An **incredible** LoL BOT!")
      .setThumbnail("https://i.imgur.com/aEJCdi7.png")
      .addFields(
        {
          name: ":flag_us: English speakers",
          value:
            "To change the bot's language, use the **!language english** command\nYou must have administrator permission to use this command\nTake a look at my commands using **!h commands**",
        },
        {
          name: ":flag_br: Falantes de Português",
          value:
            "Altere meu idioma para Português digitando: **!idioma portugues**\nÉ preciso ter permissão de administrador para alterar o idioma\nOlhe meus comandos digitando **!h comandos**",
        }
      )
      .addField(
        "Heimerdinger Bot",
        `[${lang(guild, "ADD_TO_SERVER")}](${process.env.INVITE_LINK})`
      )
      .setFooter(
        "Heimerdinger Bot isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc."
      );

    channelTarget.send(embed);
    return client;
  });
}

export default messageWhenJoining;
