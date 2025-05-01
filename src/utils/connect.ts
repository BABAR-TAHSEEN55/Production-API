import config from "config";
import mongoose from "mongoose";
import logger from "./logger";
const uri = config.get<string>("dbUri");
const DatabaseConnection = async () => {
  try {
    await mongoose.connect(uri);
    logger.info("Db Connected");
  } catch (error) {
    logger.info("Could not connect to DB");
    process.exit(1); // 1-> Exit due to some error
  }
};
export default DatabaseConnection;
