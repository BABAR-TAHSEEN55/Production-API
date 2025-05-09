import jwt from "jsonwebtoken";
import config from "config";
const publickey = config.get<string>("public_key");
const privatekey = config.get<string>("private_key");
export const SignJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined,
) => {
  return jwt.sign(object, publickey, {
    ...(options && options),
    // algorithm: "ES256", //TODO : Implement this
  });
};
export const VerifyJwt = (token: string) => {
  try {
    const decode = jwt.verify(token, publickey);
    console.log("This is Decode from Utils : ", decode);
    return {
      valid: true,
      expired: false,
      decode,
    };
  } catch (error: any) {
    console.log("This is JWT Error");
    return {
      valid: false,
      expired: error.name == "TokenExpiredError",
      decode: null, // Hein ? isn't the scope important?
    };
  }
};
