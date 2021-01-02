export default function getEmote(emojiName, cache) {
  console.log(emojiName);
  emojiName = emojiName.replace(/\s|:/g, "");
  const emote = cache.find((emoji) => emoji.name === emojiName);
  if (!emote) return "**Error send a message to support showing this!**";
  return emote.toString();
}
