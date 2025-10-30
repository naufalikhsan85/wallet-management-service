import { Request, Response } from 'express';
import { handleZodBodyError } from '../utils/controller.utils';
import { LoginSchema } from '../validations/login.validations'; 
import { getByContact } from '../accessors/users.accessors';
import { verifyArgon2Hash } from '../utils/main.utils';
import { getUser } from '../accessors/accountsClient/activeUsers.accessors';

const login = async (req: Request, res: Response) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!handleZodBodyError(parsed, res)) return;

    const { email, pin_hash } = parsed.data;

    const user = await getByContact(email, true);
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    let stat = await verifyArgon2Hash(pin_hash + user.list_pin?.salt, user.list_pin!.pin_hash)
    if (!stat) {
        res.status(404).send({ error: "Pin does not match" });
        return;
    }

    let account = await getUser(user.uuid);
    if (!account) {
        res.status(404).send({ error: "Account not found" });
        return;
    }

    res.status(200).send({
        message: "Login successful",
        user: {
            uuid: user.uuid,
            email: user.email,
            account_detail: account.accounts,
        },
    });
  } catch (e: any) {
    console.error("Error during login:", e);
    res.status(500).send({
      error: e.message || "Internal Server Error",
    });
  }
};

export {
    login
}