import prisma from "../../../prisma/accounts/prisma.connection"
import { CreateAccount } from "../../models/accountsClient/accounts.models"

const create = async(createParam: CreateAccount) =>{
    return await prisma.accounts.create({
            data: createParam,
            select: {
                created_at: true,
            }
        }
    )
}

export {
    create
}

