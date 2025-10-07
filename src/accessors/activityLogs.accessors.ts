import prisma from "../../prisma/main/prisma.connection"
import { CreateLog } from "../models/activityLogs.models"

const create = async(createParam: CreateLog) =>{
    return await prisma.activity_logs.create({
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