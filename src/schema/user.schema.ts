import { object, string, TypeOf, z } from "zod";
export const createUserSchema = z
  .object({
    body: object({
      name: z.string({
        required_error: "Name is required",
      }),
      password: z
        .string({
          required_error: "password is required",
        })
        .min(
          8,
          "password is too Short : It should contain atleast 8 character",
        ),

      passwordConfirmation: z.string({
        required_error: "Confirmation is Required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid Email"),
    }),
  })
  .refine((data) => data.body.password == data.body.passwordConfirmation, {
    message: "passwords do not match",
    path: ["body", "passwordConfirmation"], 
// Body is here cuz password Confirmation is nested inside body

});


// export const CreateUserScehemBody = z.object({
//   body: createUserSchema,
// });
export type UserCreateInput = TypeOf<typeof createUserSchema>;
export type CreateUserIN = z.infer<typeof createUserSchema>;
