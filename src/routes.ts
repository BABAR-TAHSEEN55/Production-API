import { Express, Response, Request } from "express";
import { createUserHandler } from "./controllers/user.controller";
import Validate from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", Validate(createUserSchema), createUserHandler);
}
export default routes;
