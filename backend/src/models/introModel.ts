import mongoose, { Document, Model } from "mongoose";

interface IIntro extends Document {
  image: string;
  name: string;
  bio: string;
  resume: string;
}

interface IIntroModel extends Model<IIntro> {
  ensureSingleDocument: () => Promise<IIntro>;
}

const introSchema = new mongoose.Schema<IIntro>({
  image: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  resume: { type: String, required: true },
});

const defaultData: Partial<IIntro> = {
  image: "profile.jpg",
  name: "Kürşat Polatcı",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere dictum mi, ullamcorper convallis risus iaculis nec. Pellentesque consequat tortor a sodales tincidunt. Cras efficitur odio ut ipsum malesuada, et euismod nunc consequat. Nam aliquet fermentum mattis. Duis vestibulum feugiat.",
  resume: "resume.pdf",
};

introSchema.statics.ensureSingleDocument = async function (this: Model<IIntro>): Promise<void> {
  try {
    const existingDoc = await this.findOne({});
    if (!existingDoc) {
      await this.create(defaultData);
    }
  } catch (error) {
    throw error;
  }
};

export default mongoose.model<IIntro, IIntroModel>("Intro", introSchema);
