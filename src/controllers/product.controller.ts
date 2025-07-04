import { Request, Response } from "express";
import {
    createProductInput,
    deleteProductInput,
    getProductInput,
    UpdateProductInput,
} from "../schema/product.schema";
import {
    CreateProduct,
    DeleteProduct,
    FindProduct,
    FindProductAndUpdate,
} from "../services/product.service";
import ProductModel from "../models/product.model";

export const createProductHandler = async (
    req: Request<{}, {}, createProductInput["body"]>,
    res: Response,
) => {
    // console.log("Is this routed hit?");
    //NOTE : Why can't i pass the body direclty?
    //Cuz it exepcts a freakin obj you noob
    const userId = res.locals.user?._id;

    const Product = await CreateProduct({
        ...req.body,
        User: userId,
    }); // NOTE : This is spread operator I am attaching userId to it
    res.send(Product);
};
export const UpdateProductHandler = async (
    req: Request<UpdateProductInput["params"]>,
    res: Response,
) => {
    const userId = res.locals.user?._id;
    console.log("This is UserId : ", userId);
    const productId = req.params.ProductId;
    console.log("This is ProductId : ", productId);
    const Product = await FindProduct({ ProductId: productId });
    if (!Product) {
        res.sendStatus(404);
        return;
    }
    if (String(Product.User) != userId) {
        //NOTE : Product.User is Mongoose Id so it needs to be converted into string
        res.sendStatus(403);
        return;
    }
    const UpdatedProduct = await FindProductAndUpdate(
        //NOTE : It should match with the Model Defined names
        { ProductId: productId },
        req.body,
        {
            new: true,
        },
    );
    console.log("UpdatedProduct : ", UpdatedProduct);
    res.send(UpdatedProduct);
};
export const DeleteProductHanlder = async (
    req: Request<deleteProductInput["params"]>,
    res: Response,
) => {
    const userId = res.locals.user?._id;
    const productId = req.params.ProductId;
    const Product = await FindProduct({ ProductId: productId });
    if (!Product) {
        res.sendStatus(404);
        return;
    }
    if (String(Product.User) != userId) {
        res.sendStatus(403);
        return;
    }
    try {
        await DeleteProduct({ ProductId: productId });
        res.status(200).send("Product deleted");
    } catch (error) {
        console.log("Error while deleting  Product : ", error);
    }
};
export const getProdcutHanlder = async (
    req: Request<getProductInput["params"]>,
    res: Response,
) => {
    const userId = res.locals.user?._id;
    const productId = req.params.ProductId;
    try {
        const Product = await FindProduct({ ProductId: productId });
        res.status(200).send(Product);
    } catch (error) {
        res.status(404).send("Cannot find Product");
    }
};
