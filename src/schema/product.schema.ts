import z, { TypeOf } from "zod";
export const payload = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is Required",
        }),
        description: z
            .string({
                required_error: "Description is Required",
            })
            .min(120, "Description should be at least 120 Words"),
        image: z.string({
            required_error: "Image is Required",
        }),
        price: z.number({
            required_error: "Price is Required",
        }),
    }),
});
export const params = z.object({
    productId: z.string({
        required_error: "Prodcut Id is Required",
    }),
});
export const createProductScheam = z.object({
    ...payload.shape, //Gives access to Underlying Schemas
    //TODO: Implement this and console it out
});
export const UpdateProductSchema = z.object({
    ...params.shape,
    ...payload.shape,
});
export const DeleteProductSchema = z.object({
    ...params.shape,
});
export const getProductScheam = z.object({
    ...params.shape,
});
export type createProductInput = TypeOf<typeof createProductScheam>;
export type UpdateProductInput = TypeOf<typeof UpdateProductSchema>;
export type DeleteProductInput = TypeOf<typeof DeleteProductSchema>;
export type getProductInput = TypeOf<typeof getProductScheam>;
