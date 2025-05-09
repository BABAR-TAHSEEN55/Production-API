import z, { string } from "zod";
export const CreateSessionScheam = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "password is Required",
    }),
  }),
});
