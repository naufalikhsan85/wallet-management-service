import { create } from "../accessors/activityLogs.accessors"


const emitRegistrationEvent = async(userId: number, desc: string) =>{
    await create({
        user_id: userId,
        log_types: "user_registration",
        log_desc: desc
    })
}

const emitPINCreationEvent = async(userId: number, desc: string) =>{
    await create({
        user_id: userId,
        log_types: "PIN Creation",
        log_desc: desc
    })
}

const emitPINResetEvent = async(userId: number, desc: string) =>{
    await create({
        user_id: userId,
        log_types: "PIN RESET",
        log_desc: desc
    })
}

export {
    emitRegistrationEvent,
    emitPINCreationEvent,
    emitPINResetEvent
}