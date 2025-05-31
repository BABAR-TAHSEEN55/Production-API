import { FilterQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model.ts";
import { QueryOptions } from "mongoose";

import { UpdateQuery } from "mongoose";

type ProductInput = Pick<
    ProductDocument,
    "title" | "description" | "image" | "price" | "User"
>;
export const CreateProduct = async (input: ProductInput) => {
    try {
        const product = await ProductModel.create(input);
        console.log("This is newly Created Product : ", product);
        return product;
    } catch (error) {
        console.log("Error during creation of Product : ", error);
    }
};
export const FindProduct = (
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = { lean: true },
) => {
    return ProductModel.findOne(query, {}, options); //{}->Rejection
};
export const FindProductAndUpdate = (
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options: QueryOptions,
) => {
    return ProductModel.findOneAndUpdate(query, update, options);
};
export const DeleteProduct = (query: FilterQuery<ProductDocument>) => {
    return ProductModel.deleteOne(query);
};
