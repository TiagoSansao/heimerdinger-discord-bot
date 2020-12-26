import axios from 'axios';
import parser from 'node-html-parser';
import { MessageEmbed } from 'discord.js';
import lang from '../controllers/langHandler.js';

async function getData(champion, role) {
  let { data } = await axios.get(
    `${process.env.API_CHAMPIONS}${
      role ? `${champion}/${role}` : `${champion}`
    }`
  );
  const root = parser.parse(data);
  const championName = root.querySelector('h1').childNodes[0].rawText;
  const allRunes = root
    .querySelectorAll('.ChampionRuneSmallCHGG__RuneName-sc-1vubct9-5')
    .map((element) => element.childNodes[0].rawText);
  let roleSite = root.querySelector('.ripples.sc-jDwBTQ.gctzUa');
  roleSite = roleSite.childNodes[0].childNodes[0].rawText;
  let runes = [[], [], []];
  allRunes.forEach((rune, index) => {
    if (index < 5) {
      runes[0].push(rune);
    } else if (index < 8) {
      runes[1].push(rune);
    } else if (index < 11) {
      runes[2].push(rune);
    }
  });  
  const allItems = root.querySelectorAll('div.View-sc-1c57lgy-1.cLLSJv.View__StyledDiv-sc-1c57lgy-0');
  const spells = root.querySelectorAll('img.sc-fONwsr.bsxfkk').map((spell) => {
    return spell.rawAttrs.match(/&lt;spellname&gt;([a-z]+)&lt;\/spellname&gt;/i)[1]
  })
  const championData = {
    name: championName,
    role: roleSite.replace('role-', '').toUpperCase(),
    runes: runes,
    spells: spells,
    iconUrl: `http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${championName}.png`,
  };
  return championData;
}

async function getChampion(msg, champion, role) {
  if (!champion || !role)
    return msg.channel.send(lang(msg.guild, 'CHAMPION_BAD_USAGE'));
  const data = await getData(champion, role);
  const embed = new MessageEmbed();
  embed
    .setColor('#3498db')
    .setTitle(data.name + lang(msg.guild, 'CHAMPION_TITLE'))
    .setDescription(
      `${lang(msg.guild, 'CHAMPION_DESCRIPTION_1')} ${data.name} ${lang(
        msg.guild,
        'CHAMPION_DESCRIPTION_2'
      )} **${data.role}**\n\u200B\n\u200B`
    )
    .setThumbnail(data.iconUrl)
    .addFields(
      {
        name: 'Runes:' + '\n\u200B',
        value: `**${data.runes[0].shift()}**\n${data.runes[0].join('\n')}`,
        inline: true,
      },
      {
        name: '\u200B' + '\n\u200B',
        value: `**${data.runes[1].shift()}** \n${data.runes[1].join('\n')}`,
        inline: true,
      }
    )
    .addField(
      'Heimerdinger Bot',
      `[${lang(msg.guild, 'ADD_TO_SERVER')}](${process.env.INVITE_LINK})`
    );

  msg.channel.send(embed);
}

getData('lucian', 'adc')

export default getChampion;
