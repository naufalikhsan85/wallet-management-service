import { create } from "../accessors/activityLogs.accessors"


const emitRegistrationEvent = async(userId: number, desc: string) =>{
    await create({
        user_id: userId,
        log_types: "user_registration",
        log_desc: desc
    })
}

export {
    emitRegistrationEvent
}