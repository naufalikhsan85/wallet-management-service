import { PrismaClient, Prisma } from "@prisma/accounts-client";
import { accounts, active_users, wallet_types } from "@prisma/accounts-client";
declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/accounts-client/runtime/library").DefaultArgs>;
export default prisma;
export { Prisma as instance, accounts, active_users, wallet_types };
