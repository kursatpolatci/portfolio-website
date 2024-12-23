import { NextFunction, Request, Response } from 'express';
import { CustomError, handleErrorResponse } from '../lib/utils/error';
import jwt from 'jsonwebtoken';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) throw new CustomError('Unauthorized: No token provided', 401);
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new CustomError('Unauthorized: No JWT_SECRET provided', 401);
    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new CustomError('Unauthorized: Invalid Token', 401);
    next();
  } catch (error) {
    handleErrorResponse(error, res);
  }
};
