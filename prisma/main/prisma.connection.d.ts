import { PrismaClient, Prisma } from "@prisma/main-client";
import { users, list_pin, activity_logs } from "@prisma/main-client";
declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/main-client/runtime/library").DefaultArgs>;
export default prisma;
export { Prisma as instance, users, list_pin, activity_logs };
