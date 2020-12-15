export default function getHelp(msg, prefix) {
  const help = `Hello, here are my commands, use it wisely.\n${prefix}freeweek - shows all the champions that are free to play this week.\n${prefix}user <name> <server> - shows data about the user given.\n${prefix}servers - shows all the servers' acronyms that are used to find a user.\n${prefix}help - shows all the commands, you are looking at it now.`;
  msg.react('👍');
  msg.author.send(help);
}
