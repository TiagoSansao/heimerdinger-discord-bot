export default function getEmote(emojiName, cache) {
  console.log(emojiName);
  emojiName = emojiName.replace(/\s|:/g, "");
  const regEx = new RegExp(emojiName, "i");
  const emote = cache.find((emoji) => regEx.test(emoji.name));
  if (!emote) return "**Error send a message to support showing this!**";
  return emote.toString();
}
