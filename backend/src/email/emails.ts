import { Request, Response } from 'express';
import { transporter } from './email.config';
import { CustomError, handleErrorResponse } from '../lib/utils/error';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;
    if ([name, email, message].some((value) => !value)) throw new CustomError('All fields are required', 404);

    if ([process.env.MAIL_ADDRESS, process.env.MAIL_PASSWORD].some((value) => !value))
      throw new CustomError('Mail Address or Password missing from env file', 400);

    const mailOptions = {
      from: email,
      to: process.env.MAIL_ADDRESS,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
