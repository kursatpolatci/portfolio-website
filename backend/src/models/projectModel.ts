import mongoose, { Document } from "mongoose";

interface IProject extends Document {
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
  category: string;
}

const projectSchema = new mongoose.Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  tags: { type: [String], required: true },
  link: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.model<IProject>("Project", projectSchema);
