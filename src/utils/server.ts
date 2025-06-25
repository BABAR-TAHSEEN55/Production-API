import express from "express";
import routes from "../routes";
import helmet from "helmet";
import responseTime from "response-time";
import { DeserializeUser } from "../middlewares/deserializeUser";

import { Request, Response } from "express";
import { RestResponseTimeHistogram } from "./metrics";
const CreateServer = () => {
    const app = express();
    app.use(express.json());
    app.use(helmet());
    app.use(DeserializeUser); // This is going to be called on every endPoint

    app.use(
        responseTime((req: Request, res: Response, time: number) => {
            if (req?.route?.path) {
                RestResponseTimeHistogram.observe(
                    {
                        method: req.method,
                        route: req.route.path,
                        status_code: req.statusCode,
                    },
                    time * 1000, //NOTE: : This is in milliseconds and in order to convert milli -> seconds -> Do *1000
                );
            }
        }),
    );

    routes(app);
    return app;
};
export default CreateServer;
