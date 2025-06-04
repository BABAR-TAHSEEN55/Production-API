import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { defaults, uniqueId } from "lodash";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ProductDocument extends mongoose.Document {
    User: UserDocument["_id"];
    title: string;
    image: string;
    price: number;
    description: string;
    UpdatedAt: Date;
    createdAt: Date;
}
const ProductSchema = new mongoose.Schema(
    {
        ProductId: {
            type: String,
            required: true,
            unique: true,
            default: () => {
                return `Product_${nanoid()}`;
            },
        },
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

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
