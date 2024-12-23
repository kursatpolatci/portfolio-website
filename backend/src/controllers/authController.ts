import { Request, Response } from 'express';
import { CustomError, handleErrorResponse } from '../lib/utils/error';
import { generateTokenAndSetCookie } from '../lib/utils/token';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new CustomError('Username and Password must be required', 400);

    const user = await mongoose.connection.collection('users').findOne({});
    if (!user) throw new CustomError('User not found', 404);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user.username !== username) throw new CustomError('Username not valid', 404);
    if (!isPasswordValid) throw new CustomError('Password not valid', 404);

    await generateTokenAndSetCookie(res, user._id.toString());
    res.status(200).json({ success: true, message: 'Login successfully.' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).json({ success: true, message: 'Logout successfully.' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await mongoose.connection.collection('users').findOne({});
    if (!user) throw new CustomError('User not found', 404);
    res.status(200).json({ success: true });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
