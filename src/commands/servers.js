import Discord from 'discord.js';

export default function getServers(msg) {
  // msg.channel.send(
  //   'List of servers: \n| BR - Brazil | NA - North America | EUN - Europe Nordic & East | EUW - Europe West | LA1 - Latin America North | LA2 - Latin America  South | OC - Oceania | RU - Russia | TR - Turkey | JP - Japan |'
  // )
  const embed = new Discord.MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle('Servers acronyms')
    .setDescription('Use them to specify a region when necessary')
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
    .setFooter('Heimerdinger Bot - link');

  msg.channel.send(embed);
}
