import discord from 'discord.js';
import lang from '../controllers/langHandler.js';

export default function getHelp(msg, prefix) {
  const embed = new discord.MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle('Heimerdinger Bot')
    .setDescription(lang(msg.guild, 'HELP_DESCRIPTION'))
    .setThumbnail('https://i.imgur.com/aEJCdi7.png')
    .addFields(
      {
        name: lang(msg.guild, 'COMMAND_LANGUAGE'),
        value: lang(msg.guild, 'HELP_LANGUAGE'),
      },
      {
        name: lang(msg.guild, 'COMMAND_CHAMPION'),
        value: lang(msg.guild, 'HELP_CHAMPION'),
      },
      {
        name: lang(msg.guild, 'COMMAND_USER'),
        value: lang(msg.guild, 'HELP_USER'),
      },
      {
        name: lang(msg.guild, 'COMMAND_FREEWEEK'),
        value: lang(msg.guild, 'HELP_FREEWEEK'),
      },
      {
        name: lang(msg.guild, 'COMMAND_SERVERS'),
        value: lang(msg.guild, 'HELP_SERVERS'),
      },
      {
        name: lang(msg.guild, 'COMMAND_HELP'),
        value: lang(msg.guild, 'HELP_HELP'),
      }
    )
    .addField(
      'Heimerdinger Bot',
      `[${lang(
        msg.guild,
        'ADD_TO_SERVER'
      )}](https://rebrand.ly/heimerdinger-bot)`
    );
  msg.channel.send(embed);
}
