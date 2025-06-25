import express from "express";
import config from "config";
import logger from "./utils/logger";
import DatabaseConnection from "./utils/connect";
import helmet from "helmet";
import { DeserializeUser } from "./middlewares/deserializeUser";
import CreateServer from "./utils/server";
import { StartMetricsServer } from "./utils/metrics";
const port = config.get<number>("port");
//It takes a generic of type number for port

const app = CreateServer();
app.listen(port || 7000, async () => {
    logger.info(`Server started sucessfully at ${port}`);
    StartMetricsServer();
    await DatabaseConnection();
});
//TODO : Here Async doesn't Work

export default app;
//TODO : Find out how to set Env for Postman
