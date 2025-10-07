import { activity_logs } from "../../prisma/main/prisma.connection"
import { MakeOptional } from "../types/utils.types"

type CreateLog = MakeOptional<activity_logs, "id" | "created_at">

export {
    CreateLog
}