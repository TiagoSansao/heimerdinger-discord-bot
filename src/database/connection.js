import mongoose from 'mongoose';
import {} from 'dotenv/config.js';

export default async function () {
  await mongoose
    .connect(process.env.MONGO_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to database!'));
  return mongoose;
}
