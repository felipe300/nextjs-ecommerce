import { PrismaClient } from "@prisma/client"

const globalforPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaBase = globalforPrisma.prisma ?? new PrismaClient()

export const prisma = prismaBase.$extends({
  query: {
    cart: {
      async update({ args, query }) {
        // args contains the data
        args.data = {
          ...args.data,
          updatedAt: new Date()
        }

        return query(args)
      }
    }
  }
})

if (process.env.NODE_ENV !== "production") globalforPrisma.prisma = prismaBase
