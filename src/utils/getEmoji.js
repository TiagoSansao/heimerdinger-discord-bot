export default function getEmote(emojiName, cache) {
  console.log(emojiName);
  emojiName = emojiName.replace(/\s|:/g, "");
  console.log(emojiName);
  const regEx = new RegExp(emojiName, "i");
  console.log(regEx);
  console.log(regEx.test(emojiName));
  const emote = cache.find((emoji) => regEx.test(emoji.name));
  console.log(emote.toString());
  if (!emote) return "**Error send a message to support showing this!**";
  return emote.toString();
}
