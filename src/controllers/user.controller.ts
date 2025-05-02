import { createUserIn } from "../services/user.service";
import { Request, Response } from "express"; // Is this necessary ?
import logger from "../utils/logger";
import { UserCreateInput } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, UserCreateInput["body"]>,
  res: Response,
) {
  try {
    const user = await createUserIn(req.body); // call user Service
    return user;
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
    //409 ->Conflict
  }
}
