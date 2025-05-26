import { generateToken, validateToken } from "../auths/registration.auths";
import { MailConfig } from "../configs/mail.configs";
import { AuthRegisterParam } from "../types/auth.types";
import { RegisterParam } from "../types/registration.types";
import { compressToken, decompressToken } from "../utils/compress.utils";
import { sendRegisterVerificationEmail } from "./mail.services";
import { cacheJti, isJtiUsed, markJtiAsUsed } from "./token-caches.services";

const PREFIX = 'verify-token';
const register = async(dataUser: RegisterParam)=>{
    //apakah pernah mengirimkan token dan belum expired


    //check apakah sudah ada user ini

    
    //jika sudah ada


    //jika belum ada
    //create token
    let raw = generateToken(dataUser)
    let token = await compressToken(raw.token)
    await cacheJti(PREFIX, raw.jti, 60 * 15); // simpan 15 menit di Redis


    //send email
    await sendRegisterVerificationEmail({ 
        email: dataUser.email, 
        token: token, 
        username: dataUser.username, 
        expirity: MailConfig.VERIFICATION_EXPIRITY,
        baseUrl: MailConfig.VERIFICATION_URL
    })

    return {
        message: "success send email verification"
    }
}

const verify = async(token: string): Promise<RegisterParam> =>{
    //validasi
    let dataUser: AuthRegisterParam & { jti: string }= validateToken(await decompressToken(token));

    //apakah token pernah digunakan untuk validasi
    const tokenUsed = await isJtiUsed(PREFIX, dataUser.jti);
    if (tokenUsed) {
        throw new Error("token already used for verification")
    }
    await markJtiAsUsed(PREFIX, dataUser.jti);

    //create user
    return {
        username: dataUser.username,
        email: dataUser.email
    }
}

export {
    register,
    verify
}