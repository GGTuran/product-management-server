import { z } from 'zod';

const variantZodSchema = z.object({
  type: z.string({
    errorMap: () => ({ message: 'Variant type should be a string' }),
  })
  .min(1,{message:'Variant type is required'})
  ,
  value: z.string({
    errorMap: () => ({ message: 'Variant value should be a string' }),
  })
  .min(1,{message:'Variant value is required'})
  ,
});

const inventoryZodSchema = z.object({
  quantity: z
    .number({ errorMap: () => ({ message: 'quantity should be a number' }) })
    .min(1,{message:'Quantity is required'})
    ,
  inStock: z.boolean({
    errorMap: () => ({
      message: 'The number of available stocks should be true or false',
    }),
  })
  .refine(value=>value === true || value === false,{message:'Stock is required'}),
});

const productZodSchema = z.object({
  name: z
    .string({ errorMap: () => ({ message: 'Product name is not valid' }) })
    .trim()
    .min(1,{message:'product name is required'})
    ,
  description: z.string({
    errorMap: () => ({ message: 'Description is not valid' }),
  })
  .min(1,{message:'Product description is required'})
  ,
  price: z
    .number({ errorMap: () => ({ message: 'Price is not valid' }) })
    .positive()
    .min(0,{message:'Product price is required'})
    ,
  category: z.string({
    errorMap: () => ({ message: 'Category is not valid' }),
  })
  .min(1,{message:'Product category id required'})
  ,
  tags: z.array(
    z.string({ errorMap: () => ({ message: 'Tags are invalid' }) }),
  )
  .min(1,{message:'Product tags are required'})
  ,
  variants: z.array(variantZodSchema).min(1,{message:'Product variants are required'}),
  inventory: inventoryZodSchema,
});

export const PartialZod = productZodSchema.partial();

export default productZodSchema;
