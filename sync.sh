#!/bin/bash
npx prisma generate --schema=./prisma/main/schema.prisma
npx prisma generate --schema=./prisma/accounts/schema.prisma