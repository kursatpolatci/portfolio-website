import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { connectDb } from './db/connectDb';
import { sendMessage } from './email/emails';
import { handleErrorLogging } from './lib/utils/error';
import { authRoutes, introRoutes, projectRoutes, skillRoutes } from './routes';

dotenv.config();

const port = process.env.PORT;

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/intro', introRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/skill', skillRoutes);
app.post('/api/contact', sendMessage);

const startServer = async (): Promise<void> => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error: unknown) {
    handleErrorLogging(error);
  }
};

startServer();
