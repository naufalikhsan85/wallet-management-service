import { PrismaClient, Prisma} from "@prisma/main-client";
import { users, list_pin, activity_logs } from "@prisma/main-client";

const prisma = new PrismaClient();
 
export default prisma;
export {
    Prisma as instance,
    users,
    list_pin,
    activity_logs
}