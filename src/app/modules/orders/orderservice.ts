import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderInDb = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return { result };
};

const getAllOrdersFromDb = async (email: string) => {
  if (email) {                                                //If there is an email given
    const result = await Order.find({ email });               //will find the orders of that email
    return result;
  }

  const result = await Order.find();                          //If there is no email then will fetch all orders   
  return result;
};

export const orderService = {
  createOrderInDb,
  getAllOrdersFromDb,
};
