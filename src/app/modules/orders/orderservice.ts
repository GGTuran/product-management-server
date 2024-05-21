import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderInDb = async (payload: TOrder) => {



    const result = await Order.create(payload);
    return { result };
};


const getAllOrdersFromDb = async (email: string ) => {
   
    if (email) {
        const result = await Order.find({email});
        return result;
     };
 
     const result = await Order.find();
     return result;
}


export const orderService = {
    createOrderInDb,
    getAllOrdersFromDb,
}