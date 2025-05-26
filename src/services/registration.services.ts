import { generateToken, validateToken } from "../auths/registration.auths";
import { RegisterParam } from "../types/registration.types";
import { compressToken, decompressToken } from "../utils/compress.utils";
import { sendRegisterVerificationEmail } from "./mail.services";

const register = async(dataUser: RegisterParam)=>{
    //create token
    let token = await compressToken(generateToken(dataUser))

    //send email
    await sendRegisterVerificationEmail({ 
        email: dataUser.email, 
        token: token, 
        username: dataUser.username, 
        expirity:"1 minutes" ,
        baseUrl: "http://localhost:8080/v1/registration/verify?token="
    })

    return {
        token
    }
}

const verify = async(token: string): Promise<RegisterParam> =>{
    let dataUser: RegisterParam = validateToken(await decompressToken(token)) as RegisterParam;

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