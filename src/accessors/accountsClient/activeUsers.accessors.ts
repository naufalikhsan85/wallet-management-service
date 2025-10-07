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

export {
    create
}