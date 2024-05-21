import { z } from 'zod';

const variantZodSchema = z.object({
  type: z.string({
    errorMap: () => ({ message: 'Variant type should be a string' }),
  }),
  value: z.string({
    errorMap: () => ({ message: 'Variant value should be a string' }),
  }),
});

const inventoryZodSchema = z.object({
  quantity: z
    .number({ errorMap: () => ({ message: 'quantity should be a number' }) })
    .nonnegative(),
  inStock: z.boolean({
    errorMap: () => ({
      message: 'The number of available stocks should be true or false',
    }),
  }),
});

const productZodSchema = z.object({
  name: z
    .string({ errorMap: () => ({ message: 'Product name is not valid' }) })
    .trim(),
  description: z.string({
    errorMap: () => ({ message: 'Description is not valid' }),
  }),
  price: z
    .number({ errorMap: () => ({ message: 'Price is not valid' }) })
    .positive(),
  category: z.string({
    errorMap: () => ({ message: 'Category is not valid' }),
  }),
  tags: z.array(
    z.string({ errorMap: () => ({ message: 'Tags are invalid' }) }),
  ),
  variants: z.array(variantZodSchema),
  inventory: inventoryZodSchema,
});

export default productZodSchema;
