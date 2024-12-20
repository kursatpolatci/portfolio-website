import mongoose, { Document, Model, Schema } from 'mongoose';
import { handleErrorLogging } from '../lib/utils/error';

interface IIntro extends Document {
  image: string;
  name: string;
  bio: string;
  resume: string;
}

interface IIntroModel extends Model<IIntro> {
  ensureSingleDocument: () => Promise<IIntro>;
}

const introSchema = new Schema<IIntro>({
  name: { type: String, default: 'Default' },
  bio: { type: String, default: 'Default' },
  image: { type: String, default: '' },
  resume: { type: String, default: '' },
});

introSchema.statics.ensureSingleDocument = async function (this: Model<IIntro>): Promise<IIntro> {
  try {
    const existingDoc = await this.findOne({});
    if (existingDoc) return existingDoc;
    return await this.create({});
  } catch (error) {
    handleErrorLogging(error);
    throw error;
  }
};

export default mongoose.model<IIntro, IIntroModel>('Intro', introSchema);
