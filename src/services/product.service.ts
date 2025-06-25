import { FilterQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";
import { QueryOptions } from "mongoose";

import { UpdateQuery } from "mongoose";
import { DataBaseResponseTimeHistogram } from "../utils/metrics";

type ProductInput = Pick<
    ProductDocument,
    "title" | "description" | "image" | "price" | "User"
>;
export const CreateProduct = async (input: ProductInput) => {
    const MetricsLabels = {
        operations: "CreateProduct",
    };
    const Timer = DataBaseResponseTimeHistogram.startTimer();
    try {
        const product = await ProductModel.create(input);
        // console.log("This is newly Created Product : ", product);
        Timer({ ...MetricsLabels, success: "true" });
        return product;
    } catch (error) {
        Timer({ ...MetricsLabels, success: "false" });
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
//TODO : For converting MilliSeconds -> Seconds ? Divide or Mutliply
