import { Request, Response } from 'express';
import { transporter } from './email.config';
import { handleErrorResponse } from '../lib/utils/error';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'All fields are required' });
      return;
    }
    if (!process.env.MAIL_ADDRESS || !process.env.MAIL_PASSWORD) {
      res.status(400).json({ success: false, message: 'Mail address and password are required' });
      return;
    }
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
