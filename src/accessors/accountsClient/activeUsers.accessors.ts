import prisma from "../../../prisma/accounts/prisma.connection"
import { CreateUser } from "../../models/accountsClient/activeUsers.models"

const create = async(createParam: CreateUser) =>{
    return await prisma.active_users.create({
            data: createParam,
            select: {
                id: true,
                created_at: true,
            }
        }
    )
}

const getUser = async(uuid: string) =>{
    let obj: any = {}
    obj["uuid"] =  uuid

    return await prisma.active_users.findFirst({
        where: obj,
        include: {
            accounts: {
                select: {
                    pub_key: true,
                    wallet_type: true,
                    id: true
                }
            }
        }
    })
}


export {
    create,
    getUser
}