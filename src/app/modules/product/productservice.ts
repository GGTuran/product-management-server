//the file name should be product.service.ts,but for some unknown reason i couldn't save it as a typescript file so i had to ignore the dot in the middle

import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDb = async ( product: TProduct ) =>{
    //I will create by using instance
    const ProductInstance = new ProductModel(product);

    const result = await ProductInstance.save(); //creating instance
    return result;
};




export const productService = {
    createProductIntoDb,
}