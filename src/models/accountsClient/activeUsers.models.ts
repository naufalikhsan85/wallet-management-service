import { active_users } from "../../../prisma/accounts/prisma.connection"
import { MakeOptional } from "../../types/utils.types"

type CreateUser = MakeOptional<active_users, "id" | "created_at" >

export {
    CreateUser
}