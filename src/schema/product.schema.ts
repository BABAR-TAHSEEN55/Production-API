import { number, object, string, TypeOf } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "Title is required ",
        }),
        description: string({
            required_error: "Description is required",
        }).min(10, "Description should at least contain 10 characters"),
        image: string({
            required_error: "Image is required",
        }),
        price: number({
            required_error: "Price is required",
        }),
    }),
};
const params = {
    params: object({
        ProductId: string({
            required_error: "Product Id is required",
        }),
    }),
};

export const createProductSchema = object({
    ...payload,
});
export const updateProductSchema = object({
    ...payload,
    ...params,
});

export const getProductSchema = object({
    ...params,
});
export const deleteProductSchema = object({
    ...params,
});
export type createProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type getProductInput = TypeOf<typeof getProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
//NOTE : If you dont want to wrap {
//body : object({
//
//})
//}
//You can directly take ✅ Option 1: Remove the outer body wrapper from Zod schema
// This is the most common and recommended way when working with Express:
// and also change you middleware that is parsing it
