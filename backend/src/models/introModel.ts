import mongoose, { Document, Model } from "mongoose";

interface IIntroSchema extends Document {
  profileImg: string;
  fullName: string;
  summary: string;
  resume: string;
}

interface IIntroModel extends Model<IIntroSchema> {
  ensureSingleDocument: () => Promise<IIntroSchema>;
}

const introSchema = new mongoose.Schema<IIntroSchema>({
  profileImg: { type: String, required: true },
  fullName: { type: String, required: true },
  summary: { type: String, required: true },
  resume: { type: String, required: true },
});

const defaultData: Partial<IIntroSchema> = {
  profileImg: "profile.jpg",
  fullName: "Kürşat Polatcı",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere dictum mi, ullamcorper convallis risus iaculis nec. Pellentesque consequat tortor a sodales tincidunt. Cras efficitur odio ut ipsum malesuada, et euismod nunc consequat. Nam aliquet fermentum mattis. Duis vestibulum feugiat.",
  resume: "resume.pdf",
};

introSchema.statics.ensureSingleDocument = async function (this: Model<IIntroSchema>) : Promise<void>{
  try {
    const existingDoc = await this.findOne({});
    if (!existingDoc) {
      await this.create(defaultData);
    }
  } catch (error) {
    throw error
  }
};

const Intro = mongoose.model<IIntroSchema, IIntroModel>("Intro", introSchema);

export default Intro;
