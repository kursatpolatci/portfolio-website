import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDb";
import projectRoutes from "./routes/projectRoutes";
import skillRoutes from "./routes/skillRoutes";
import { sendMessage } from "./email/emails";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = process.env.PORT;

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/project", projectRoutes);
app.use("/api/skill", skillRoutes);
app.post("/api/contact", sendMessage);

const startServer = async (): Promise<void> => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer()