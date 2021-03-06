import axios from 'axios';
import parser from 'node-html-parser';
import { MessageEmbed } from 'discord.js';
import lang from '../controllers/langHandler.js';
import getEmoji from '../utils/getEmoji.js';

async function getData(champion, role) {
  try {
    let { data } = await axios.get(
      `${process.env.API_CHAMPIONS}${
        role ? `${champion}/${role}` : `${champion}`
      }`
    );
    const root = parser.parse(data);

    let championName = root.querySelector('h1').childNodes[0].rawText;
    championName = championName
      .split(' ')
      .map((partOfName) => partOfName[0].toUpperCase() + partOfName.slice(1))
      .join('');

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

    const spells = root
      .querySelectorAll('img.sc-fONwsr.bsxfkk')
      .map((spell) => {
        return spell.rawAttrs.match(
          /&lt;spellname&gt;([a-z]+)&lt;\/spellname&gt;/i
        )[1];
      });

    const winRate = root.querySelector(
      'div.shared__StatValue-sc-1nek54v-0.jLqjzk'
    ).childNodes[0].rawText;

    let skillsOrder = [];
    root
      .querySelectorAll(
        'p.typography__Caption-sc-1mpsx83-11.typography__CaptionBold-sc-1mpsx83-12.dwtPBh'
      )
      .forEach((ability, index) => {
        if (index === 1 || (index === 2) | (index === 3)) {
          skillsOrder.push(
            `:regional_indicator_${ability.childNodes[0].rawText.toLowerCase()}:`
          );
        }
      });

    const championData = {
      name: championName,
      role: roleSite.replace('role-', '').toUpperCase(),
      runes: runes,
      spells: [spells[0], spells[1]],
      winRate: winRate,
      skillsOrder: skillsOrder,
      iconUrl: `http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${championName}.png`,
    };
    return championData;
  } catch (err) {
    return 404;
  }
}

async function getChampion(msg, champion, role, cache) {
  if (!champion || !role)
    return msg.channel.send(lang(msg.guild, 'CHAMPION_BAD_USAGE'));
  const data = await getData(champion.replace('_', ''), role);
  if (data === 404)
    return msg.channel.send(lang(msg.guild, 'CHAMPION_BAD_USAGE'));
  const embed = new MessageEmbed();
  embed
    .setColor('#3498db')
    .setURL('https://heimerdingerbot.github.io/')
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
        name:
          getEmoji('RunesIcon', cache) +
          ' Runes:                        ' +
          '\n\u200B',
        value:
          `**${getEmoji(
            data.runes[0][0],
            cache
          )} ${data.runes[0].shift()}**\n` +
          data.runes[0]
            .map((rune) => `${getEmoji(rune, cache)} ${rune}`)
            .join('\n'),
        inline: true,
      },
      {
        name: '\u200B                              ' + '\n\u200B',
        value:
          `**${getEmoji(
            data.runes[1][0],
            cache
          )} ${data.runes[1].shift()}**\n` +
          data.runes[1]
            .map((rune) => `${getEmoji(rune, cache)} ${rune}`)
            .join('\n'),
        inline: true,
      },
      {
        name: '\u200B                              \n \u200B \n \u200B \n',
        value:
          data.runes[2]
            .map((rune) => `${getEmoji(rune, cache)} ${rune}`)
            .join('\n') +
          '\n\u200B' +
          '\n\u200B',
        inline: true,
      },
      {
        name: 'Spells',
        value: data.spells.map((spell) => getEmoji(spell, cache)).join(' '),
        inline: true,
      },
      {
        name: 'Skills order',
        value: `${data.skillsOrder.join(' -> ')}`,
        inline: true,
      },
      {
        name: '\u200B' + '\n\u200B',
        value: '\u200B' + '\n\u200B',
        inline: true,
      }
    )
    .addField(
      'Heimerdinger Bot',
      `[${lang(msg.guild, 'ADD_TO_SERVER')}](${process.env.INVITE_LINK})`
    );

  msg.channel.send(embed);
}
export default getChampion;
