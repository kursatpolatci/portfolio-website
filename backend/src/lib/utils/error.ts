import { Response } from 'express';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export const handleErrorResponse = (error: unknown, res: Response): void => {
  if (error instanceof CustomError) res.status(error.statusCode).json({ success: false, message: error.message });
  else if (error instanceof Error) res.status(500).json({ success: false, message: error.message });
  else res.status(500).json({ success: false, message: error });
};

export const handleErrorLogging = (error: unknown): void => {
  if (error instanceof CustomError) console.log(`CustomError: `, error.message);
  else if (error instanceof Error) console.log(`Error: `, error.message);
  else console.log(error);
};
