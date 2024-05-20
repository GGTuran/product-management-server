import { Request, Response } from "express";
import { productService } from "./productservice";
import productZodSchema from "./product.validation";

const createProduct = async (req:Request, res:Response)=>{
    try {
        const { product: ProductData } = req.body;
        //validating it by using zod
        // const ZodValidation = productZodSchema.parse(ProductData)
        //calling service function 
        const result = await productService.createProductIntoDb(ProductData);
        res.status(200).json({
            success:true,
            message:"Product data is created successfully",
            data:result,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Couldn't create product data because something is wrong",
            error:error,
        });
    }
};

export const ProductControllers ={
    createProduct,
}