import mongoose, { Document } from "mongoose";

interface ISkill extends Document {
  name: string;
  img: string;
  colorInvert: boolean;
}

const skillSchema = new mongoose.Schema<ISkill>({
  name: { type: String, required: true },
  img: { type: String, required: true },
  colorInvert: { type: Boolean, required: true, default: false },
});

const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
