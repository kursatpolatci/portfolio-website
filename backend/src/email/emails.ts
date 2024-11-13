import { Request, Response } from "express";
import { transporter } from "./email.config";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const mailOptions = {
      from: email,
      to: process.env.MAIL_ADDRESS,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", result);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
