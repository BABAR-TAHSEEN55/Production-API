import mongoose from "mongoose";
import { UserDocument } from "./user.model.ts";
import { defaults } from "lodash";

export interface ProductDocument extends mongoose.Document {
    User: UserDocument["_id"];
    title: string;
    image: string;
    price: number;
    description: string;
    createdAt: Date;
    UpdatedAt: Date;
}
const ProductSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
        },
    },
    { timestamps: true },
);
console.log("Is this Logged?");
const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
