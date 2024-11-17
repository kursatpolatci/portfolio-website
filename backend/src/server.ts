import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import { sendMessage } from "./email/emails";
import introRoutes from "./routes/introRoutes";
import projectRoutes from "./routes/projectRoutes";
import skillRoutes from "./routes/skillRoutes";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const port = process.env.PORT;

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use("/api/intro", introRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/skill", skillRoutes);
app.post("/api/contact", sendMessage);

const startServer = async (): Promise<void> => {
  try {
    const res = await connectDb();
    console.log(`MongoDB connected: ${res}`)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(`Error in startServer: ${error}`);
  }
};

startServer();