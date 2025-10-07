import { list_pin } from "../../prisma/main/prisma.connection"
import { MakeOptional } from "../types/utils.types"

type CreatePIN = MakeOptional<list_pin, "id" | "max_try" | "num_tried" | "created_at" | "updated_at">

type UpdatePIN = MakeOptional<list_pin, "id" | "created_at" | "updated_at">

export {
    CreatePIN,
    UpdatePIN
}