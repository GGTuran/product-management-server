import  { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../product/product.model';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is required for ordering'],
  },
  productId: {
    type: String,
    ref: 'Product',
    required: [true, 'productId is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price has to be positive'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'At least one quantity should be brought'],
  },
});

orderSchema.pre('save', async function (next) {
  const amount = await Product.findById(this.productId);                  //checking the availability

  if (!amount) {
    throw new Error("This product doesn't exist in the database");
  }

  if (amount.inventory.quantity < this.quantity) {                        //checking the amount of product   
    throw new Error('Insufficient quantity available in inventory');
  }

  amount.inventory.quantity -= this.quantity;                            //updating the product
  amount.inventory.inStock = amount.inventory.quantity > 0;

  await amount.save(); 

  next();
});



export const Order = model<TOrder>('Order', orderSchema);
