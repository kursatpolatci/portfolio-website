import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import { sendMessage } from "./email/emails";
import { handleError } from "./lib/utils/error";
import { authRoutes, introRoutes, projectRoutes, skillRoutes } from "./routes";

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

app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/intro", introRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/skill", skillRoutes);
app.post("/api/contact", sendMessage);

const startServer = async (): Promise<void> => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error: unknown) {
    handleError(error);
  }
};

startServer();
