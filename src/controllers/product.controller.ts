import { Request, Response } from "express";
import {
    createProductInput,
    getProductInput,
    UpdateProductInput,
} from "../schema/product.schema.ts";
import {
    CreateProduct,
    DeleteProduct,
    FindProduct,
    FindProductAndUpdate,
} from "../services/product.service.ts";

export const CreateProductHandler = async (
    req: Request<{}, {}, createProductInput["body"]>,
    res: Response,
) => {
    const userId = res.locals.user._id;
    console.log("this is UserId Prodcut : ", userId);
    const body = req.body;
    try {
        const product = await CreateProduct({ ...body, User: userId });
        res.send(product);
    } catch (error) {
        console.log("Error while Create Product : ", error);
    }
};
export const UpdateProductHandler = async (
    req: Request<UpdateProductInput["params"], {}, {}>,
    res: Response,
) => {
    const userId = res.locals.user._id;
    const ProductId = req.params.productId;
    const update = req.body;
    const product = await FindProduct({ ProductId });
    if (!product) {
        res.sendStatus(404);
        return;
    }
    if (product.User != userId) {
        res.sendStatus(403);
        return;
    }
    const updateProduct = await FindProductAndUpdate({ ProductId }, update, {
        new: true,
    });
    res.send({ updateProduct });
    console.log("This is the Product Id : ", ProductId);
};
export const DeleteProductHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const ProductId = req.params.productId;
    const product = await FindProduct({ ProductId });
    if (!product) {
        res.sendStatus(404);
        return;
    }
    if (product.User != userId) {
        res.sendStatus(403);
        return;
    }
    const deleteProduct = await DeleteProduct({ ProductId });
    return res.sendStatus(200); //FIXME: This might cause error
};
export const GetProductHanlder = async (
    req: Request<getProductInput["params"]>,
    res: Response,
) => {
    const ProductId = req.params.productId;
    const Product = await FindProduct({ ProductId });
    if (!Product) {
        res.sendStatus(403).send({ Message: "Unable to retrieve the Product" });
    }
    res.send(Product);
};
