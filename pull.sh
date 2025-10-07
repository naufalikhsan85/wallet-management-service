#!/bin/bash
npx prisma db pull --schema=./prisma/main/schema.prisma
npx prisma db pull --schema=./prisma/accounts/schema.prisma