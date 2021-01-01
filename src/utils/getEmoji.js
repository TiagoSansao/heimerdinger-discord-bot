function getEmote(emojiName) {
  const emote = client.emojis.cache.find((emoji) => emoji.name === emojiName);
  console.log(emote.toString());
  console.log(emote);
  return emote.toString();
}
