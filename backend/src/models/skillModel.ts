import mongoose, { Document } from 'mongoose';

interface ISkill extends Document {
  name: string;
  image: string;
  colorInvert: boolean;
  [key: string]: any;
}

const skillSchema = new mongoose.Schema<ISkill>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    colorInvert: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>('Skill', skillSchema);
