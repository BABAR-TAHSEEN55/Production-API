// import z, { TypeOf } from "zod";
// export const payload = z.object({
//     body: z.object({
//         title: z.string({
//             required_error: "Title is Required",
//         }),
//         description: z
//             .string({
//                 required_error: "Description is Required",
//             })
//             .min(120, "Description should be at least 120 Words"),
//         image: z.string({
//             required_error: "Image is Required",
//         }),
//         price: z.number({
//             required_error: "Price is Required",
//         }),
//     }),
// });
// export const params = z.object({
//     productId: z.string({
//         required_error: "Product Id is Required",
//     }),
// });
// export const createProductScheam = z.object({
//     ...payload.shape, //Gives access to Underlying Schemas
//     //TODO: Implement this and console it out
// });
// export const UpdateProductSchema = z.object({
//     ...params.shape,
//     ...payload.shape,
// });
// export const DeleteProductSchema = z.object({
//     ...params.shape,
// });
// export const getProductScheam = z.object({
//     ...params.shape,
// });
// export type CreateProductInput = TypeOf<typeof createProductScheam>;
// export type UpdateProductInput = TypeOf<typeof UpdateProductSchema>;
// export type DeleteProductInput = TypeOf<typeof DeleteProductSchema>;
// export type getProductInput = TypeOf<typeof getProductScheam>;

import { number, object, string, TypeOf } from "zod";

// const payload = object({
//     body : object({
//
//     })
// })
const payload = {
    body: object({
        title: string({
            required_error: "Title is required ",
        }),
        description: string({
            required_error: "Description is required",
        }).min(80, "Description should at least contain 80 characters"),
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
