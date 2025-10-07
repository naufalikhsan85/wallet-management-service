import { users } from "../../prisma/main/prisma.connection"
import { MakeOptional } from "../types/utils.types"

type CreateUser = MakeOptional<users, "id" | "created_at" | "updated_at">

export {
    CreateUser
}