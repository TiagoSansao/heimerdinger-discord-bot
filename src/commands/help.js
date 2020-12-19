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
        name: `${prefix}champion <champion name> <role>`,
        value: `Shows data about a champion\nExample: ${prefix}champion garen top`,
      },
      {
        name: `${prefix}user <name> <server>`,
        value:
          'Shows data about the user given.' +
          `\nExample: ${prefix}user faker kr`,
      },
      {
        name: `${prefix}freeweek`,
        value: 'Shows all the champions that are free to play this week.',
      },
      {
        name: `${prefix}servers`,
        value: 'Shows all the servers acronyms.',
      },
      {
        name: `${prefix}help`,
        value: 'Shows all the commands, you are looking at it now.',
      }
    )
    .setTimestamp()
    .setFooter('Heimerdinger Bot - link');
  msg.channel.send(embed);
}
