import { Request, Response } from "express";
import orderZodSchema from "./order.validation";
import { Product } from "../product/product.model";
import { orderService } from "./orderservice";


const createOrder  = async (req:Request, res:Response)=>{
    try {
        const {order: orderData } = req.body;
        const ZodValidatedOrder = orderZodSchema.parse(req.body);
        //checking availability
        // const availability = await Product.isProductExists(ZodValidatedOrder.productId);
        // if(availability){
            const result = await orderService.createOrderInDb(ZodValidatedOrder);
            res.status(200).json({
                success: true,
                message: "Order is created successfully",
                data: result,
            }); 
            
        // }
        // const availability = await Product.isProductExist
        // const result = orderService.createOrderInDb(ZodValidatedOrder);
      
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Couldn't create order",
            error: error.message,
        });
    };
};

const getAllOrders = async(req:Request, res:Response)=>{
    try {
       const  orderedEmail:any  = req.query.email;
       if(orderedEmail){
        function verifyEmail(email:string){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        if(verifyEmail(orderedEmail)){
            const result = await orderService.getAllOrdersFromDb(orderedEmail);
            if(result.length > 0){
                res.status(200).json({
                    success: true,
                    message: `Fetched orders of ${orderedEmail}!`,
                    data: result,
                });
            } else {
                res.status(500).json({
                  success: false,
                  message: `There is no order from this email`,
                });
              };
        }else{
            res.status(500).json({
                success:false,
                message:'Invalid email address',
            });
        }
       }
       const result = await orderService.getAllOrdersFromDb('');
       if(result.length > 0){
        res.status(200).json({
            success:true,
            message:'orders fetched successfully',
            data:result
           }); 
       }else{
        res.status(500).json({
            success:false,
            message:'Order not found',
        });
       }
     
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Couldn't find order",
            error: error.message,
        });
    };
}

export const OrderController = {
    createOrder,
    getAllOrders,
}