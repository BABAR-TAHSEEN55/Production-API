import express from "express";
import routes from "../routes";
import helmet from "helmet";
import { DeserializeUser } from "../middlewares/deserializeUser";
const CreateServer = () => {
    const app = express();
    app.use(express.json());
    app.use(helmet());
    app.use(DeserializeUser); // This is going to be called on every endPoint
    routes(app);
    return app;
};
export default CreateServer;
