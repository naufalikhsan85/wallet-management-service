import * as jwt from 'jsonwebtoken'
import { AuthConfig } from '../configs/auth.configs'
import { Request, Response, NextFunction } from 'express';
import { RegisterParam } from '../types/registration.types';
import { AuthRegisterParam } from '../types/auth.types';

const secretKey = AuthConfig.REGISTER_PWD_TOKEN;
const expire_time = AuthConfig.REGISTER_EXPIRES_IN

const generateToken = (dataUser: RegisterParam): string =>{
    let JwtPayload: AuthRegisterParam = Object.assign(dataUser, { useFor: "register_verification"})
    let token = jwt.sign(JwtPayload, secretKey, { expiresIn: expire_time as jwt.SignOptions['expiresIn'] });
    return token;
};

const validateToken = (token: string) => {
    try {   
      if (!token || token == "") {
        throw new Error("must validate with verification token");
      }
      const decoded = jwt.verify(token, secretKey);
      let JwtPayload: RegisterParam  = decoded as jwt.JwtPayload as RegisterParam
      return JwtPayload
    } catch (err: any) {
      throw new Error(`error at validating verification token, reason:${err}`);
      return
    }
};

export {
    generateToken,
    validateToken,
}