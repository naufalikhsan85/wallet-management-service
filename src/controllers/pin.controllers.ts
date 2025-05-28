import { Request, Response } from 'express';
import { handleZodBodyError, handleZodParamsError } from '../utils/controller.utils';
import { PINCreationSchema } from '../validations/pin.validations';
import { PINCreationParam } from '../types/pin.types';
import { createOrReset } from '../services/pin.services';

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

export {
    create
}