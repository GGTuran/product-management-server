import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderInDb = async( payload : TOrder)=>{
    //I will create by creating Instance
    const OrderInstance = new Order(payload);
    const result = await OrderInstance.save();
    return result;
};


const getAllOrdersFromDb = async (email : string | undefined)=>{
    const verified:{email?:string} = {};
    if(email){
        verified.email = email;
    }
    const result = await Order.find(verified);
    return result;
}


export const orderService = {
    createOrderInDb,
    getAllOrdersFromDb,
}