import prisma from "../../prisma/prisma.connection"
import { CreateUser } from "../models/users.models"

const getByContact = async(contact: string, isEmail: boolean)=>{
    let obj: any = {}
    if(isEmail == true) obj["email"] =  contact
    else obj["phone"] =  contact

    return await prisma.users.findFirst({
        where: obj,
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
    create
}