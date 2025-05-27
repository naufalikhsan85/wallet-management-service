import prisma from "../../prisma/prisma.connection"
import { CreateLog } from "../models/activityLogs.modes"

const create = async(createParam: CreateLog) =>{
    return await prisma.activity_logs.create({
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