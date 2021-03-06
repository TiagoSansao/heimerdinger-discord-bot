import Discord from 'discord.js';
import lang from '../controllers/langHandler.js';

export default function getServers(msg) {
  const embed = new Discord.MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle(lang(msg.guild, 'SERVERS_ACRONYMS'))
    .setDescription(lang(msg.guild, 'SERVERS_DESCRIPTION'))
    .setURL('https://heimerdingerbot.github.io/')
    .setThumbnail('https://i.imgur.com/aEJCdi7.png')
    .addFields(
      { name: 'BR', value: 'Brazil', inline: true },
      { name: 'NA', value: 'North America', inline: true },
      { name: 'EUN', value: 'Europe Nordic & East', inline: true },
      { name: 'EUW', value: 'Europe West', inline: true },
      { name: 'LA1', value: 'Latin America North', inline: true },
      { name: 'LA2', value: 'Latin America South', inline: true },
      { name: 'OC', value: 'Oceania', inline: true },
      { name: 'RU', value: 'Russia', inline: true },
      { name: 'TR', value: 'Turkey', inline: true },
      { name: 'JP', value: 'Japan', inline: true }
    )
    .setTimestamp()
    .addField(
      'Heimerdinger Bot',
      `[${lang(msg.guild, 'ADD_TO_SERVER')}](${process.env.INVITE_LINK})`
    );

  msg.channel.send(embed);
}
