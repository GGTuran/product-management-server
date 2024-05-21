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
  
//Custom static method for checking if the product is available or not
export interface ProductMethod extends Model<TProduct>{
  isProductExists: (id:string) => Promise<TProduct | null>;
};

