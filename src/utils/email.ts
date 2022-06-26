import nodemailer, { SendMailOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL
  }
});

export const sendMail = async (
  mailOptions: SendMailOptions
) => await transporter.sendMail(mailOptions);
