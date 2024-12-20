import { NextFunction, Request, Response } from 'express';
import { handleErrorResponse } from '../lib/utils/error';
import jwt from 'jsonwebtoken';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
      return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(401).json({ success: false, message: 'Unauthorized: No JWT_SECRET provided' });
      return;
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      res.status(401).json({ success: false, message: 'Unauthorized: Invalid Token' });
      return;
    }
    next();
  } catch (error) {
    handleErrorResponse(error, res);
  }
};
