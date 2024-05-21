import  { model } from 'mongoose';
import { Schema } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';


// Schema for TVariant
const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
},
  {_id:false}
);

// Schema for TInventory
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
},
  {_id:false}
);

// Schema for TProduct
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true , unique:true},
  description: { type: String, required: true, unique:true },
  price: { type: Number, required: true, unique:true },
  category: { type: String, required: true, unique:true },
  tags: { type: [String], required: true, unique:true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

export const ProductModel = model<TProduct>('Product', productSchema);   //named the model ProductModel because sometimes i am confused about the name 