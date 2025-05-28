import { number } from "zod";

type CreateLog = {
    user_id: number;
    log_types: string;
    log_desc: string;
}

export {
    CreateLog
}