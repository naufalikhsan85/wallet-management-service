"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const main_client_1 = require("@prisma/main-client");
Object.defineProperty(exports, "instance", { enumerable: true, get: function () { return main_client_1.Prisma; } });
const prisma = new main_client_1.PrismaClient();
exports.default = prisma;
