"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const accounts_client_1 = require("@prisma/accounts-client");
Object.defineProperty(exports, "instance", { enumerable: true, get: function () { return accounts_client_1.Prisma; } });
const prisma = new accounts_client_1.PrismaClient();
exports.default = prisma;
