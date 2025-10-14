import { create, update } from "../accessors/pin.accessors";
import { getPINByUser } from "../accessors/users.accessors";
import { PINCreationParam, PINUpdateParam } from "../types/pin.types";
import { generateSalt, hashWithArgon2, verifyArgon2Hash } from "../utils/main.utils";
import { emitPINCreationEvent, emitPINResetEvent } from "./activityLogs.services";

const createOrReset = async (pinData: PINCreationParam) => {
    //find user id
    const userFound = await getPINByUser(pinData.uuid)

    //generate pin
    let salt = generateSalt(75)
    let generatedPIN = await hashWithArgon2(pinData.pin_hash + salt)

    let result: any = {}
    //apakah sudah punya pin
    if (userFound) {
        if (!userFound.list_pin) {
            //belum punya
            //create => insert
            result = await create({
                user_id: userFound.id,
                pin_hash: generatedPIN,
                salt: salt
            })
            await emitPINCreationEvent(userFound.id, "create new first PIN")
        }
        else {
            //sudah punya
            //reset => update
            result = await update(
                userFound.list_pin.id,
                {
                    user_id: userFound.id,
                    pin_hash: generatedPIN,
                    salt: salt,
                    max_try: 3,
                    num_tried: 0
                }
            )
            await emitPINResetEvent(userFound.id, "reset and create new PIN")
        }
    }
    else {
        throw new Error("user not found, must register user")
    }

    return result
}

const change = async (pinData: PINUpdateParam) => {
    //find user id
    const userFound = await getPINByUser(pinData.uuid)

    //generate pin
    let salt = generateSalt(75)
    let generatedPIN = await hashWithArgon2(pinData.new_pin_hash + salt)

    let result: any = {}

    //apakah sudah punya pin
    if (userFound) {
        if (!userFound.list_pin) {
            //belum punya
            //create => insert
            result = await create({
                user_id: userFound.id,
                pin_hash: generatedPIN,
                salt: salt
            })
            await emitPINCreationEvent(userFound.id, "No existing PIN found for user. Saving new PIN")
        }
        else {
            //sudah punya

            //verify old pin
            let stat = await verifyArgon2Hash(pinData.old_pin_hash + userFound.list_pin.salt, userFound.list_pin.pin_hash)

            if (stat == false) throw new Error("Old PIN does not match our records")

            //reset => update
            result = await update(
                userFound.list_pin.id,
                {
                    user_id: userFound.id,
                    pin_hash: generatedPIN,
                    salt: salt,
                    max_try: 3,
                    num_tried: 0
                }
            )
            await emitPINResetEvent(userFound.id, "PIN change process completed successfully")
        }
    }
    else {
        throw new Error("user not found, must register user")
    }

    return result
}

export {
    createOrReset,
    change
}