import dotenv from "dotenv";
dotenv.config();
export default {
  port: 7000,
  dbUri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@cluster0.fmjrv.mongodb.net/rest-api`,

  SaltWorkFactor: 15,
};
