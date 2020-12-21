import mongoConnection from '../database/connection.js';
import langModel from '../database/models/language.js';
import config from '../utils/languages.js';

const guildLanguages = {};

const loadLanguages = async (client) => {
  await mongoConnection().then(async (mongoose) => {
    try {
      for (const guild of client.guilds.cache) {
        const guildId = guild[0];
        const result = await langModel.findOne({
          _id: guildId,
        });
        guildLanguages[guildId] = result ? result.language : 'english';
      }
    } finally {
      mongoose.connection.close();
    }
  });
};

function setLanguage(guild, language) {
  guildLanguages[guild._id] = language.toLowerCase();
}

export default (guild, textId) => {
  if (!config.translations[textId]) {
    throw new Error('Unknown text ID:' + textId);
  }
  const selectedLanguage = guildLanguages[guild.id].toLowerCase();
  return config.translations[textId][selectedLanguage];
};
export { loadLanguages, setLanguage };
