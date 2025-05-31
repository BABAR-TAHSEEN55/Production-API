import { Express, Response, Request } from "express";
import { createUserHandler } from "./controllers/user.controller";
import Validate from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { CreateUserSessionHanlder } from "./controllers/session.controller";
import { CreateSessionScheam } from "./schema/session.schema";
import { getUserSessionsHandler } from "./controllers/session.controller";
import { RequireUser } from "./middlewares/RequireUser";
import { UpdateSession } from "./services/session.service.ts";
import { DeleteSessionHandler } from "./controllers/session.controller.ts";
import {
    CreateProductInput,
    createProductScheam,
    createProductSchema,
} from "./schema/product.schema.ts";
import { createProductHandler } from "./controllers/product.controller.ts";
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
    app.delete("/api/sessions", RequireUser, DeleteSessionHandler);
    app.post(
        "/api/Product",
        [RequireUser, Validate(createProductSchema)],
        createProductHandler,
    );
}
export default routes;
//TODO : When not provided with email or password req hangs solve this
