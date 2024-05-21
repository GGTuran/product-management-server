import { Model } from "mongoose";

export type TVariant = {
    type: string;
    value: string;
  }
  
  export type TInventory = {
    quantity: number;
    inStock: boolean;
  }

export type TProduct = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: TVariant[];
    inventory: TInventory;
  }
  
//Custom instance method for checking if the product is available or not

export type ProductMethods = {
  isUserExists( id : string):Promise<TProduct | null>;
};

export type ProductInstanceModel = Model<
TProduct,
Record<string, never>,
ProductMethods
>;
