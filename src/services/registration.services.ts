import { create, getByContact } from "../accessors/users.accessors";
import { create as createOnAccounts } from "../accessors/accountsClient/activeUsers.accessors";
import { generateToken, validateToken } from "../auths/registration.auths";
import { MailConfig } from "../configs/mail.configs";
import { AuthRegisterParam } from "../types/auth.types";
import { RegisterParam } from "../types/registration.types";
import { v4 as uuidv4 } from 'uuid';
import { compressToken, decompressToken } from "../utils/compress.utils";
import { sendRegisterVerificationEmail } from "./mail.services";
import { cacheJti, isJtiUsed, markJtiAsUsed, queryToken } from "./token-caches.services";
import { emitRegistrationEvent } from "./activityLogs.services";
import { RedisConfig } from "../configs/redis.configs";
import { formatMessage } from "../utils/message.utils";
import { messages } from "../message/registration.message";

const PREFIX = 'verify-token';

const register = async(dataUser: RegisterParam)=>{
    //apakah sudah request token
    const tokenCheck = await queryToken(PREFIX, dataUser.contact);
    if (tokenCheck) throw new Error(formatMessage(messages, "REGISTRATION_ALREADY_REQUESTED"))

    //check apakah contact sudah dipakai
    let checked = await getByContact(dataUser.contact, dataUser.isEmail)
    if(checked) throw new Error(formatMessage(messages, "CONTACT_ALREADY_REGISTERED"))

    //create token
    let raw = generateToken(dataUser)
    let token = await compressToken(raw.token)
    await cacheJti(PREFIX, raw.jti, 60 * RedisConfig.REDIS_REGIS_EXPIRITY); //in second * minute

    if(dataUser.isEmail){ //send email
        await sendRegisterVerificationEmail({ 
            email: dataUser.contact, 
            token: token, 
            username: dataUser.username, 
            expirity: MailConfig.VERIFICATION_EXPIRITY,
            baseUrl: MailConfig.VERIFICATION_URL
        })
    }
    else{   //send phone

    }
    
    
    return {
        message: dataUser.isEmail ? formatMessage(messages, "VERIFICATION_SENT_EMAIL", {contact: dataUser.contact}): formatMessage(messages, "VERIFICATION_SENT_PHONE", {contact: dataUser.contact}), 
    }
}

const verify = async(token: string): Promise<RegisterParam> =>{
    //validasi
    let dataUser: AuthRegisterParam & { jti: string }= validateToken(await decompressToken(token));

    //apakah token pernah digunakan untuk validasi
    const tokenUsed = await isJtiUsed(PREFIX, dataUser.jti);
    if (tokenUsed) throw new Error(formatMessage(messages, "TOKEN_ALREADY_USED"))
    await markJtiAsUsed(PREFIX, dataUser.jti);

    //create user
    const newUUID = uuidv4()
    let result = await create({
        uuid: newUUID,
        username: dataUser.username,
        email: dataUser.isEmail ? dataUser.contact : newUUID,
        phone: !dataUser.isEmail ? dataUser.contact : newUUID,

    })

    let emit_message = formatMessage(messages, "REGISTRATION_EVENT_EMITTED", {userId: result.id.toString()})
    await emitRegistrationEvent(
        result.id, 
        dataUser.isEmail ? emit_message + "(email)" : emit_message + "(phone)"
    )
    
    //add user account
    let resultUserAccounts = await createOnAccounts({uuid: newUUID})

    //add default wallet account



    return Object.assign(dataUser, { message : formatMessage(messages, "VERIFICATION_SUCCESS", {username: dataUser.username}) })
}

export {
    register,
    verify
}