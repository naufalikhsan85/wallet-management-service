import { Request, Response } from 'express';
import { handleZodBodyError } from '../utils/controller.utils';
import { PINCreationSchema, PINUpdateSchema } from '../validations/pin.validations';
import { PINCreationParam, PINUpdateParam } from '../types/pin.types';
import { change as changePIN, createOrReset } from '../services/pin.services';

const create = async (req: Request, res: Response) => {
  try {
    const parsed = PINCreationSchema.safeParse(req.body);

    if (!handleZodBodyError(parsed, res)) return;

    const pinData: PINCreationParam = {
        uuid: parsed.data.uuid,
        pin_hash: parsed.data.pin_hash
    }

    const result = await createOrReset(pinData)

    res.status(200).send(result);
    return
  } catch (e: any) {
    console.log('Error during PIN creation:', e.message);
    res.status(500).send({
      error: e.toString()
    });
    return
  }
};

const change = async (req: Request, res: Response) => {
  try {
    const parsed = PINUpdateSchema.safeParse(req.body);

    if (!handleZodBodyError(parsed, res)) return;

    const pinData: PINUpdateParam = {
        uuid: parsed.data.uuid,
        old_pin_hash: parsed.data.old_pin_hash,
        new_pin_hash: parsed.data.new_pin_hash
    }

    const result = await changePIN(pinData)

    res.status(200).send(result);
    return
  } catch (e: any) {
    console.log('Error during PIN Change:', e.message);
    res.status(500).send({
      error: e.toString()
    });
    return
  }
};
export {
    create,
    change
}