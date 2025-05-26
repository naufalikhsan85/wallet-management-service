import fs from 'fs';
import nodemailer from 'nodemailer';
import { MailConfig } from '../configs/mail.configs';
import { SendVerificationEmailParams } from '../types/mail.types';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // pakai STARTTLS
  auth: {
    user: MailConfig.EMAIL_ADDRESS,
    pass: MailConfig.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, //hanya untuk dev atau jaringan bermasalah
  },
});

const sendRegisterVerificationEmail = async ({
  username, 
  expirity,
  email,
  token,
  baseUrl = 'http://localhost:8080/v1/registration/verify?token=',
}: SendVerificationEmailParams): Promise<void> =>{
  const verifyUrl = `${baseUrl}${token}`;
  const htmlContent = await loadRegisterVerificationEmailTemplate(verifyUrl, username, expirity);

  const mailOptions = {
    from: `"Wallet-Management-Services" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
}

const loadRegisterVerificationEmailTemplate = async(verifyUrl: string, username: string, expirity: string): Promise<string> => {
  const templatePath = "./src/templates/register-verification-email.html"
  let template = fs.readFileSync(templatePath, 'utf-8');

  template = template.replace(/{{verifyUrl}}/g, verifyUrl);
  template = template.replace(/{{usernameMail}}/g, username);
  template = template.replace(/{{expirityUrl}}/g, expirity);

  return template
}

export {
    sendRegisterVerificationEmail
}