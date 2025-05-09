import dotenv from "dotenv";
dotenv.config();
export default {
  port: 7000,
  dbUri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@cluster0.fmjrv.mongodb.net/rest-api`,
  SaltWorkFactor: 15,
  public_key: `${process.env.PUBLIC_KEY}`,
  private_key: `${process.env.PRIVATE_KEY}`,
  accessTokenttl: "15m",
  refreshTokenttl: "1y",
};
