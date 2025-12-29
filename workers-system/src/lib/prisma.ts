import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query", "info", "warn", "error"],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    }).$extends({
        query: {
            $allOperations({ operation, model, args, query }) {
                const start = Date.now();
                return query(args).finally(() => {
                    const end = Date.now();
                    console.log(`prisma:timing ${model}.${operation} took ${end - start}ms`);
                });
            },
        },
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
