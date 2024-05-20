import { z } from "zod";



const variantZodSchema = z.object({
    type: z.string({errorMap:()=>({message:'Variant type should be a string'}),required_error:' Variant type is required'}),
    value: z.string({errorMap:()=>({message:'Variant value should be a string'}),required_error:'Variant value is required'}),
  });
  

  const inventoryZodSchema = z.object({
    quantity: z.number({errorMap:()=>({message:'quantity should be a number'}),required_error:'Quantity is required'}).nonnegative(),
    inStock: z.boolean({errorMap:()=>({message:'The number of available stocks should be a number'}),required_error:'The number of stock should be mentioned'}),
  });
  

  const productZodSchema = z.object({
    name: z.string({errorMap: () => ({message:'Product name is not valid'}),required_error:'Product name should be given'}).trim().nonempty('Product name is required'),
    description: z.string({errorMap : ()=> ({message:'Description is not valid'}),required_error:'Description should be included'}),
    price: z.number({errorMap:()=>({message:'Price is not valid'}),required_error:'Price should be mentioned in database'}).positive(),
    category: z.string({errorMap:()=>({message:'Category is not valid'}),required_error:'Category should be mentioned'}),
    tags: z.array(z.string({errorMap:()=>({message:'Tags are invalid'}),required_error:'Tags should be given'})),
    variants: z.array(variantZodSchema),
    inventory: inventoryZodSchema,
  });

  export default productZodSchema;