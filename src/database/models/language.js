import mongoose from 'mongoose';

const languageSchema = {
  _id: { type: String, required: true },
  language: { type: String, required: true },
};

export default mongoose.model('languages', languageSchema);
