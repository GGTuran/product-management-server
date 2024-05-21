import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const  orderSchema = new Schema<TOrder>({
    email:{
        type:String,
        required:[true, 'Email is required for ordering'],
        match:[/.+\@.+\..+/,'give a valid email'],
    },
    productId:{
        type:String,
        required:[true, 'productId is required'],
    },
    price:{
        type:Number,
        required:[true, 'Price is required'],
        min:[0,'Price has to be positive']
    },
    quantity:{
        type:Number,
        required:[true, 'Quantity is required'],
        min:[1,'At least one quantity should be brought'],
    },
});

export const Order = model<TOrder>('Order',orderSchema);