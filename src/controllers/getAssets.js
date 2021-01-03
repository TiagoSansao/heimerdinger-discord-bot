import { Collection } from "discord.js";

export default async function getCache(guilds) {
  const guildsId = [
    "792883012676616252",
    "795028444769550386",
    "795029339019804703",
  ];
  let emojis = [];
  for (let guildId of guildsId) {
    const guild = await guilds.fetch(guildId);
    emojis = emojis.concat(guild.emojis.cache);
  }
  const map = new Collection([...emojis[0], ...emojis[1], ...emojis[2]]);
  return map;
}
