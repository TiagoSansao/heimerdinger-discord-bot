export default function getEmote(emojiName, cache) {
  const emote = cache.find((emoji) => emoji.name === emojiName);
  return emote.toString();
}
