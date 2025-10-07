import { PrismaClient, Prisma} from "@prisma/accounts-client";
 import { accounts, active_users, wallet_types, } from "@prisma/accounts-client";

const prisma = new PrismaClient();
 
export default prisma;
export {
    Prisma as instance,
    accounts,
    active_users,
    wallet_types
}