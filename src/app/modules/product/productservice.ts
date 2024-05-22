//the file name should be product.service.ts,but for some unknown reason i couldn't save it as a typescript file so i had to ignore the dot in the middle

import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (payload: TProduct) => {
  const result = await Product.create(payload);                              //creating by using built-is static method
  return result;
};

const getAllProductsFromDb = async (searchTerm: string) => {
  //find by regex
  const querySearch = searchTerm
    ? {
        $or: [                                                               //using or operator will take all the conditions and apply any of them   
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  const result = await Product.find(querySearch);                              //search by text or fetch all data
  return result;
};

const getSingleProductFromDb = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const UpdateProductInDb = async (id: string, updatedData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

const deleteProductFromDb = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  UpdateProductInDb,
  deleteProductFromDb,
};
