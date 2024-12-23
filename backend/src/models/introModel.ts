import mongoose, { Document, Model, Schema } from 'mongoose';
import { handleErrorLogging } from '../lib/utils/error';

interface IIntro extends Document {
  image: string;
  name: string;
  bio: string;
  resume: string;
  [key: string]: any;
}

interface IIntroModel extends Model<IIntro> {
  ensureSingleDocument: () => Promise<IIntro>;
}

const introSchema = new Schema<IIntro>({
  name: { type: String },
  bio: { type: String },
  image: { type: String },
  resume: { type: String },
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
