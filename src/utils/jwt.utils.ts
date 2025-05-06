import jwt from "jsonwebtoken";
import config from "config";
import { object } from "zod";
const publickey = config.get<string>("public_key");
const privatekey = config.get<string>("private_key");
export const SignJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined,
) => {
  return jwt.sign(object, privatekey, {
    ...(options && options),
    // algorithm: "ES256", //TODO : Implement this
  });
};
export const VerifyJwt = (token: string) => {
  try {
    const decode = jwt.verify(token, publickey);
    return {
      valid: true,
      expired: false,
      decode,
    };
  } catch (error: any) {
    console.log("This is JWT Error");
    return {
      valid: true,
      expired: false,
      decode: null, // Hein ? isn't the scope important?
    };
  }
};
