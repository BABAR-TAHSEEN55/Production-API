import express from "express";
import config from "config";
import logger from "./utils/logger";
import DatabaseConnection from "./utils/connect";
import routes from "./routes";
import helmet from "helmet";
const port = config.get<number>("port");
//It takes a generic of type number for port
const app = express();
app.use(express.json());
app.use(helmet());
app.listen(port | 7000, async () => {
  logger.info(`Server started sucessfully at ${port}`);
  await DatabaseConnection();
  routes(app);
});
