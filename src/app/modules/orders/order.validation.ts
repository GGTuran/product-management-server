import { z } from "zod";

const orderZodSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    productId: z.string({message:'ProductId should be a string'}),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
  });
  