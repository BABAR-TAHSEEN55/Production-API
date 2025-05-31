import { createUserIn } from "../services/user.service";
import { Request, Response } from "express"; // Is this necessary ?
import logger from "../utils/logger";
import { UserCreateInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, UserCreateInput["body"]>,
  res: Response,
) {
  try {
    const user = await createUserIn(req.body); // call user Service
    res.send(omit(user?.toJSON(), "password")); //Omit is part of Lodash which helps in deep objects Manipulation
    // console.log(user);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message); //This is the issue Find about it more
    console.log("this is the error from Controller");

    //409 ->Conflict
  }
}

//TODO: 1) Validating Zod Middleware without parse and use safeparse do it and check if it works or not
