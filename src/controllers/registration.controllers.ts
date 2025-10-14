import { Request, Response } from 'express';
import { RegistrationParamsSchema, verificationParamsSchema } from "../validations/registration.validations"
import * as registration from '../services/registration.services'
import { RegisterParam } from '../types/registration.types';
import { handleZodBodyError, handleZodParamsError } from '../utils/controller.utils';
import fs from 'fs';

const register = async (req: Request, res: Response) => {
  try {
    const parsed = RegistrationParamsSchema.safeParse(req.body);

    if (!handleZodBodyError(parsed, res)) return;

    const isEmail = parsed.data.contact.includes("@")
    const dataUser: RegisterParam = {
      username: isEmail ? parsed.data.contact.split("@")[0] : parsed.data.contact,
      contact: parsed.data.contact,
      isEmail: isEmail
    }
    const result = await registration.register(dataUser);

    res.status(200).send(result);
    return
  } catch (e: any) {
    console.log('Error during register new user:', e.message);
    res.status(500).send({
      error: e.toString()
    });
    return
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    const parsed = verificationParamsSchema.safeParse(req.query);

    if (!handleZodParamsError(parsed, res)) return;

    let result: RegisterParam & {
      useFor: string;
    } & {
      jti: string;
      uuid?: string;
      token?: string;
    } = await registration.verify(parsed.data.token);
    console.log(result);
    
    const templatePath = "./src/templates/register-verified.html"
    let template = fs.readFileSync(templatePath, 'utf-8');
    template = template
      .replace(/{{username}}/g, result.username)
      .replace(/{{contact}}/g, result.contact)
      .replace(/{{registered_with}}/g, result.isEmail ? "email" : "phone number")
      .replace(/{{uuid}}/g, result.uuid || '')
      .replace(/{{token}}/g, result.token || '');

    res.status(200).send(template);
    return
  } catch (e: any) {
    console.log('Error during verify new user:', e.message);
    res.status(500).send({
      error: e.toString()
    });
    return
  }
};

export {
  register,
  verify
}