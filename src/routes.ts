import { Express, Response, Request } from "express";
import { createUserHandler } from "./controllers/user.controller";
import Validate from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { CreateUserSessionHanlder } from "./controllers/session.controller";
import { CreateSessionScheam } from "./schema/session.schema";
import { getUserSessionsHandler } from "./controllers/session.controller";
import { RequireUser } from "./middlewares/RequireUser";
import { UpdateSession } from "./services/session.service";
import { DeleteSessionHandler } from "./controllers/session.controller";
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from "./schema/product.schema";
import {
    createProductHandler,
    DeleteProductHanlder,
    getProdcutHanlder,
    UpdateProductHandler,
} from "./controllers/product.controller";
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
        "/api/product",
        Validate(createProductSchema),
        createProductHandler,
    );
    app.get(
        "/api/Product/:ProductId",
        Validate(getProductSchema),
        getProdcutHanlder,
    );
    app.put(
        "/api/Product/:ProductId",
        [RequireUser, Validate(updateProductSchema)],
        UpdateProductHandler,
    );
    app.delete(
        "/api/Product/:ProductId",
        [RequireUser, Validate(deleteProductSchema)],
        DeleteProductHanlder,
    );
}
export default routes;
//TODO : When not provided with email or password req hangs solve this
