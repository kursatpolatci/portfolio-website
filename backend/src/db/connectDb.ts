import mongoose from 'mongoose';

export const connectDb = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw `MONGO_URI is not defined in environment variables`;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    throw error;
  }
};
