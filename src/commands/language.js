import { setLanguage } from '../controllers/langHandler.js';
import config from '../utils/languages.js';
import mongoConnection from '../database/connection.js';
import languageModel from '../database/models/language.js';

export default async function language(msg, language, prefix) {
  if (!language)
    return msg.channel.send(
      `You need to specify a language!\nExample: ${prefix}language portuguese`
    );
  const { guild } = msg;
  const targetLanguage = language.toLowerCase();
  if (!config.languages.includes(targetLanguage))
    return msg.channel.send('This language is not supported!');

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
      console.log(guild.id, targetLanguage);
      setLanguage(guild, targetLanguage);
      msg.channel.send('Now, I only speak ' + targetLanguage + ' around here.');
    } finally {
      mongoose.connection.close();
    }
  });
}
