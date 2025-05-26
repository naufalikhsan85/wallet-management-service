import { Request, Response } from 'express';
import { RegistrationParamsSchema, verificationParamsSchema } from "../validations/registration.validations"
import * as registration from '../services/registration.services'
import { RegisterParam } from '../types/registration.types';
import { handleZodBodyError, handleZodParamsError } from '../utils/controller.utils';

const register = async (req: Request, res: Response) => {
  try {
    const parsed = RegistrationParamsSchema.safeParse(req.body);

    if (!handleZodBodyError(parsed, res)) return;

    const dataUser: RegisterParam = {
        username : parsed.data.email.split("@")[0],
        email: parsed.data.email
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

    const result = await registration.verify(parsed.data.token);

    res.status(200).send(result);
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