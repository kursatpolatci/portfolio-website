import { Request, Response } from 'express';
import { handleErrorResponse } from '../lib/utils/error';
import { generateTokenAndSetCookie } from '../lib/utils/token';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json({ success: false, message: 'Username and Password must be required.' });
      return;
    }
    const user = await mongoose.connection.collection('users').findOne({});
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }
    if (user.username !== username) {
      res.status(404).json({ success: false, message: 'Username not valid.' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(404).json({ success: false, message: 'Password not valid.' });
      return;
    }
    await generateTokenAndSetCookie(res, user._id.toString());
    res.status(200).json({ success: true, message: 'Login successfully.' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logout successfully.' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await mongoose.connection.collection('users').findOne({});
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
