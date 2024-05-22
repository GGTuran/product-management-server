import { Request, Response } from 'express';
import orderZodSchema from './order.validation';
import { orderService } from './orderservice';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const ZodValidatedOrder = orderZodSchema.parse(orderData);

    const result = await orderService.createOrderInDb(ZodValidatedOrder);
    res.status(200).json({
      success: true,
      message: 'Order is created successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message||"Order not found",
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderedEmail: any = req.query.email;
    if (orderedEmail) {
      function verifyEmail(email: string) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;        //first i have to verifay the email by using regex
        return regex.test(email);
      }
      if (verifyEmail(orderedEmail)) {
        const result = await orderService.getAllOrdersFromDb(orderedEmail);        //checking if the verified email has an order or not 
        if (result.length > 0) {
          return res.status(200).json({                                            //had to use return before giving a response status because the server was crashing 
            success: true,
            message: `Fetched orders of ${orderedEmail}!`,
            data: result,
          });
        } else {
          return res.status(500).json({
            success: false,
            message: `There is no order from this email`,
          });
        }
      } else {
        return res.status(500).json({                                               //error handling for invalid email address
          success: false,
          message: 'Invalid email address',
        });
      }
    }
    const result = await orderService.getAllOrdersFromDb(req.query.email as any);     //getting all the orders from database
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'orders fetched successfully',
        data: result,
      });
    } else {                                                                          //if there is something wrong
      return res.status(500).json({
        success: false,
        message: 'Order not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Order not found",
      error: error,
    });
  }
};                                        

export const OrderController = {
  createOrder,
  getAllOrders,
};
