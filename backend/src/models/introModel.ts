import mongoose, { Document, Model } from "mongoose";

interface IIntroSchema extends Document {
  profileImg: string;
  fullName: string;
  summary: string[];
  resume: string;
}

interface IIntroModel extends Model<IIntroSchema> {
  ensureSingleDocument: () => Promise<void>;
}

const introSchema = new mongoose.Schema<IIntroSchema>({
  profileImg: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  summary: {
    type: [String],
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const defaultData: Partial<IIntroSchema> = {
  profileImg: "vesikalik.jpg",
  fullName: "Kürşat Polatcı",
  summary: ["First sentence.", "Second sentence.", "Third sentence."],
  resume: "resume.pdf",
};

introSchema.statics.ensureSingleDocument = async function (
  this: Model<IIntroSchema>
): Promise<void> {
  try {
    const existingDoc = await this.findOne({});
    if (!existingDoc) {
      await this.create(defaultData);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const Intro = mongoose.model<IIntroSchema, IIntroModel>("Intro", introSchema);

export default Intro;
