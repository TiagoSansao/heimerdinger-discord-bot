import discord from 'discord.js';

export default function getHelp(msg, prefix) {
  const embed = new discord.MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle('Heimerdinger bot')
    .setDescription('Help - Commands')
    .setThumbnail('https://i.imgur.com/aEJCdi7.png')
    .addFields(
      {
        name: `${prefix}freeweek`,
        value: 'Shows all the champions that are free to play this week.',
      },
      {
        name: `${prefix}user <name> <server>`,
        value: 'Shows data about the user given.',
      },
      {
        name: `${prefix}help`,
        value: 'Shows all the commands, you are looking at it now.',
      },
      {
        name: `${prefix}servers`,
        value: 'Shows all the servers acronyms.',
      }
    )
    .setTimestamp()
    .setFooter('Heimerdinger Bot - link');
  msg.channel.send(embed);
}
