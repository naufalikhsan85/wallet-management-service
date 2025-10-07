import { accounts } from "../../../prisma/accounts/prisma.connection"
import { MakeOptional } from "../../types/utils.types"

type CreateAccount = MakeOptional<accounts, "id" | "created_at" | "updated_at">

export {
    CreateAccount
}