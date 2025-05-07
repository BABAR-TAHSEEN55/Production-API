import { Express, Response, Request } from "express";
import { createUserHandler } from "./controllers/user.controller";
import Validate from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { CreateUserSessionHanlder } from "./controllers/session.controller";
import { CreateSessionScheam } from "./schema/session.schema";
import { getUserSessionsHandler } from "./controllers/session.controller";
import { RequireUser } from "./middlewares/RequireUser";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", Validate(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    Validate(CreateSessionScheam),
    CreateUserSessionHanlder,
  );
  app.get("/api/sessions", RequireUser, getUserSessionsHandler);
}
export default routes;
//TODO : When not provided with email or password req hangs solve this
