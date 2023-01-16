import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

//   model Product {
//     id           String   @id @default(cuid())
//     createdAt    DateTime @default(now())
//     updatedAt    DateTime @updatedAt
//     name         String
//     price        Int
//     quantity     Int
//     image        String
//     description  String
//     category     String
//     brand        String
//     rating       Float
//     numReviews   Int
//     countInStock Int
// }

export const productRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.findUnique({
          where: { id: input.id },
        });
        if (!product) {
          throw new Error(`No product found with id ${input.id}`);
        }
        return product;
      } catch (error) {
        if (error instanceof Error) {
          return { success: false, error: error.message };
        }
        return { success: false, error: "Unknown error" };
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.prisma.product.findMany();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Unknown error" };
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        image: z.string(),
        description: z.string(),
        category: z.string(),
        brand: z.string(),
        rating: z.number(),
        numReviews: z.number(),
        countInStock: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.create({
          data: {
            name: input.name,
            price: input.price,
            quantity: input.quantity,
            image: input.image,
            description: input.description,
            category: input.category,
            brand: input.brand,
            rating: input.rating,
            numReviews: input.numReviews,
            countInStock: input.countInStock,
          },
        });
        return product;
      } catch (error) {
        if (error instanceof Error) {
          return { success: false, error: error.message };
        }
        return { success: false, error: "Unknown error" };
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        image: z.string(),
        description: z.string(),
        category: z.string(),
        brand: z.string(),
        rating: z.number(),
        numReviews: z.number(),
        countInStock: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.update({
          where: { id: input.id },
          data: {
            name: input.name,
            price: input.price,
            quantity: input.quantity,
            image: input.image,
            description: input.description,
            category: input.category,
            brand: input.brand,
            rating: input.rating,
            numReviews: input.numReviews,
            countInStock: input.countInStock,
          },
        });
        return product;
      } catch (error) {
        if (error instanceof Error) {
          return { success: false, error: error.message };
        }
        return { success: false, error: "Unknown error" };
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.delete({
          where: { id: input.id },
        });
        return product;
      } catch (error) {
        if (error instanceof Error) {
          return { success: false, error: error.message };
        }
        return { success: false, error: "Unknown error" };
      }
    }),
});
