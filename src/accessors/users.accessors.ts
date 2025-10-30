import prisma from "../../prisma/main/prisma.connection"
import { CreateUser } from "../models/users.models"

const getByContact = async(contact: string, isEmail: boolean)=>{
    let obj: any = {}
    if(isEmail == true) obj["email"] =  contact
    else obj["phone"] =  contact

    return await prisma.users.findFirst({
        where: obj,
        include: {
            list_pin: {
                select: {
                    pin_hash: true,
                    salt: true,
                    id: true
                }
            }
        }
    })
}

const getPINByUser = async(uuid: string)=>{
    let obj: any = {}
    obj["uuid"] =  uuid

    return await prisma.users.findFirst({
        where: obj,
        include: {
            list_pin: {
                select: {
                    pin_hash: true,
                    salt: true,
                    id: true
                }
            }
        }
    })
}

const create = async(createUserParam: CreateUser) =>{
    return await prisma.users.create({
            data: createUserParam,
            select: {
                id: true,
                created_at: true,
                updated_at: true
            }
        }
    )
}

export {
    getByContact,
    getPINByUser,
    create
}