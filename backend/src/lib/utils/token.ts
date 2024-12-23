import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError, handleErrorLogging } from './error';

export const generateTokenAndSetCookie = async (res: Response, userId: string): Promise<void> => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new CustomError('No JWT_SECRET provided', 401);

    const token = jwt.sign({ userId }, secret, { expiresIn: '15d' });
    res.cookie('token', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  } catch (error: unknown) {
    handleErrorLogging(error);
    throw error;
  }
};
