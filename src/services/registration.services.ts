import { create, getByContact } from "../accessors/users.accessors";
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

const PREFIX = 'verify-token';

const register = async(dataUser: RegisterParam)=>{
    //apakah sudah request token
    const tokenCheck = await queryToken(PREFIX, dataUser.contact);
    if (tokenCheck) throw new Error("you already request for registration with this contact, please check your email or phone message")

    //check apakah contact sudah dipakai
    let checked = await getByContact(dataUser.contact, dataUser.isEmail)
    if(checked) throw new Error("contact already regitered, please use other contact")

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
        message: "success send verification method"
    }
}

const verify = async(token: string): Promise<RegisterParam> =>{
    //validasi
    let dataUser: AuthRegisterParam & { jti: string }= validateToken(await decompressToken(token));

    //apakah token pernah digunakan untuk validasi
    const tokenUsed = await isJtiUsed(PREFIX, dataUser.jti);
    if (tokenUsed) throw new Error("token already used for verification")
    await markJtiAsUsed(PREFIX, dataUser.jti);

    //create user
    const newUUID = uuidv4()
    let result = await create({
        uuid: newUUID,
        username: dataUser.username,
        email: dataUser.isEmail ? dataUser.contact : newUUID,
        phone: !dataUser.isEmail ? dataUser.contact : newUUID,

    })

    await emitRegistrationEvent(
        result.id, 
        dataUser.isEmail ? "registered with email" : "registered with phone"
    )
    
    return dataUser
}

export {
    register,
    verify
}