import mongoose from "mongoose";
import Intro from "../models/introModel";

export const connectDb = async (): Promise<string> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        await Intro.ensureSingleDocument();
        return conn.connection.host
    } catch (error) {
        return Promise.reject<string>(error)
    }
}