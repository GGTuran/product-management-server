import  { model } from 'mongoose';
import { Schema } from 'mongoose';
import { ProductInstanceModel, ProductMethods, TInventory, TProduct, TVariant } from './product.interface';


// Schema for TVariant
const variantSchema = new Schema<TVariant>({
  type: { type: String, required: [true, 'Variant type is required'] },
  value: { type: String, required: [true, 'Variant value is required'] },
},
  {_id:false}
);

// Schema for TInventory
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: [true,'Quantity number is required'] },
  inStock: { type: Boolean, required: [true,'Inventory stock is required'] },
},
  {_id:false}
);

// Schema for TProduct
const productSchema = new Schema<TProduct,ProductInstanceModel,ProductMethods>({
  name: { type: String, required: [true, 'Product name is required'] , unique:true},
  description: { type: String, required: [true,'Description is required'], unique:true },
  price: { type: Number, required: [true,'Price is required'], unique:true },
  category: { type: String, required: [true,'Category is required'], unique:true },
  tags: { type: [String], required: [true, 'Tags are required'], unique:true },
  variants: { type: [variantSchema], required: [true, 'Variants are required'] },
  inventory: { type: inventorySchema, required: [true, 'Inventory is required'] },
});



//Creating the custom instance method
productSchema.methods.isUserExists = async function (id: string){
  const existingProduct = await Product.findById(id);
  return existingProduct; 
};





export const Product = model<TProduct,ProductInstanceModel>('Product', productSchema);   


