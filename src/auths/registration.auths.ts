import * as jwt from 'jsonwebtoken'
import { AuthConfig } from '../configs/auth.configs'
import { RegisterParam } from '../types/registration.types';
import { AuthRegisterParam } from '../types/auth.types';
import { formatMessage } from '../utils/message.utils';
import { messages } from '../message/registration.message';

const secretKey = AuthConfig.REGISTER_PWD_TOKEN;
const expire_time = AuthConfig.REGISTER_EXPIRES_IN

const generateToken = (dataUser: RegisterParam): {
  token: string,
  jti: string
}=> {
    const jti = dataUser.contact;
    const JwtPayload: AuthRegisterParam & { jti: string } = {
      ...dataUser,
      useFor: "register_verification",
      jti,
    };
    let token = jwt.sign(JwtPayload, secretKey, { 
      expiresIn: expire_time as jwt.SignOptions['expiresIn'], 
    });

    return { token, jti };
};

const validateToken = (token: string) => {
    try {   
      if (!token || token == "") {
        throw new Error(formatMessage(messages, "VERIFICATION_FAILED") + "-" + "must validate with verification token");
      }
      const decoded = jwt.verify(token, secretKey);
      let JwtPayload: AuthRegisterParam & { jti: string }  = decoded as jwt.JwtPayload as AuthRegisterParam & { jti: string }
      if(JwtPayload.useFor != "register_verification")  throw new Error(formatMessage(messages, "VERIFICATION_FAILED") + "-" + "token is not for verification process");
      
      return JwtPayload
    } catch (err: any) {
      throw new Error(formatMessage(messages, "VERIFICATION_FAILED") + "-" + err);
    }
};

export {
    generateToken,
    validateToken,
}