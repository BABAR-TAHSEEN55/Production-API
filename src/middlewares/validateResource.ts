import { AnyZodObject, ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
const Validate =
    (
        schema: ZodTypeAny, // This is the issue
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error: any) {
            res.status(400);
        }
    };

//This is being used in validationResource in Middlewares and it is actually passed in routes along with Middlewares
export default Validate;
