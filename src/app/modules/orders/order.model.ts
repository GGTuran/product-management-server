import { Schema, model } from 'mongoose';
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
  const availability = await Product.findById(this.productId);         //to check id the product exist or not
  if (!availability) {
    throw new Error("This product doesn't exists in database");
  }
  const {
    inventory: { quantity },                                           //destructuring the quantity field
  }: any = await Product.findById(this.productId);                     //finding by the id
  if (quantity < this.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }
  //reducing the quantity
  const updatedQuantity = await Product.findByIdAndUpdate(              //Updating the amount available is stock
    this.productId,
    {
      $inc: {
        'inventory.quantity': -this.quantity,                           //by simply subtracting the order quantity from this.quantity
      },
    },
    { new: true },
  );
  //updating the stock if there is no quantity left
  if (updatedQuantity?.inventory.quantity === 0) {                       //making the stock field false if there is no quantity  
    await Product.findByIdAndUpdate(this.productId, {
      $set: {
        'inventory.inStock': false,
      },
    });
  }
  //calling the next function
  next();
});

export const Order = model<TOrder>('Order', orderSchema);
