import lang, { setLanguage } from '../controllers/langHandler.js';
import config from '../utils/languages.js';
import mongoConnection from '../database/connection.js';
import languageModel from '../database/models/language.js';

export default async function language(msg, language) {
  if (!msg.member.hasPermission('ADMINISTRATOR'))
    return msg.channel.send(lang(msg.guild, 'NO_PERMISSION'));
  if (!language) return msg.channel.send(lang(msg.guild, 'LANGUAGE_ERROR'));
  const { guild } = msg;
  const targetLanguage = language.toLowerCase();
  if (!config.languages.includes(targetLanguage))
    return msg.channel.send(lang(msg.guild, 'LANGUAGE_NOT_SUPPORTED'));

  await mongoConnection().then(async (mongoose) => {
    try {
      await languageModel.findOneAndUpdate(
        {
          _id: guild.id,
        },
        {
          _id: guild.id,
          language: targetLanguage,
        },
        {
          upsert: true,
        }
      );
      setLanguage(guild, targetLanguage);
      msg.channel.send(lang(msg.guild, 'LANGUAGE_CHANGED'));
    } finally {
      mongoose.connection.close();
    }
  });
}
