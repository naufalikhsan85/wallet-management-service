import prisma from "../../prisma/prisma.connection"
import { CreatePIN, UpdatePIN } from "../models/listPIN.models"
import { convertUnixTimestampToPrismaDateTime, currentDate } from "../utils/main.utils"

const create = async(createPIN: CreatePIN) =>{
    return await prisma.list_pin.create({
            data: createPIN,
            select: {
                created_at: true,
                updated_at: true
            }
        }
    )
}

const update = async(id: number, updatePIN: UpdatePIN) =>{
    return await prisma.list_pin.update({
        where: {
            id: id,
        },
        data: Object.assign(updatePIN, { updated_at: convertUnixTimestampToPrismaDateTime(currentDate()) }),
        select: {
            created_at: true,
            updated_at: true
        }
    })
}

export {
    create,
    update
}