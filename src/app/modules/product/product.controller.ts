import { Request, Response } from 'express';
import { productService } from './productservice';
import productZodSchema from './product.validation';
import { TProduct } from './product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: ProductData } = req.body;
    //validating it by using zod
    const ZodValidatedProduct = productZodSchema.parse(ProductData);
    //calling service function
    const result =
      await productService.createProductIntoDb(ZodValidatedProduct);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message ||"Route not found",
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await productService.getAllProductsFromDb(searchTerm);

    let response: string = 'Products matched ';
    if (searchTerm) {
      response = `Products matching searched term ${req.query.searchTerm} fetched successfully`;
    }
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message||"Couldn't get product data because something is wrong",
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await productService.getSingleProductFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: product,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Product not found',
      error: error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const addedData = req.body;                                                         
    const updatedData = productZodSchema.parse(addedData);                
    const result = await productService.UpdateProductInDb(
      productId,
      updatedData,                                                     
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ||'Route not found!',
      error:error
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProductFromDb(productId);                   //this result is unused variable because we have to return null
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'Route not found!',
      error: error.message||error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
