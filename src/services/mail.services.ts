import fs from 'fs';
import nodemailer from 'nodemailer';
import { MailConfig } from '../configs/mail.configs';
import { SendVerificationEmailParams } from '../types/mail.types';
import { shortenUrl } from './shortener.service';
import { APPConfig } from '../configs/app.configs';

const transporter = nodemailer.createTransport({
  host: MailConfig.EMAIL_PROVIDER_HOST,
  port: Number(MailConfig.EMAIL_PROVIDER_PORT),
  secure: true,
  auth: {
    user: MailConfig.EMAIL_ADDRESS,
    pass: MailConfig.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendRegisterVerificationEmail = async ({
  username,
  expirity,
  email,
  token,
  baseUrl = 'http://localhost:8080/v1/registration/verify?token=',
}: SendVerificationEmailParams): Promise<void> => {
  const raw_url = `${baseUrl}${token}`;
  const verifyUrl = APPConfig.RESOLVER + await shortenUrl(raw_url)
  const htmlContent = await loadRegisterVerificationEmailTemplate(verifyUrl, username, expirity);

  const mailOptions = {
    from: `"Wallet-Management-Services" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: 'Verify your email',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
}

const loadRegisterVerificationEmailTemplate = async (verifyUrl: string, username: string, expirity: string): Promise<string> => {
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