import mongoose, { Document } from 'mongoose';

interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category: string;
  [key: string]: any;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    link: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', projectSchema);
