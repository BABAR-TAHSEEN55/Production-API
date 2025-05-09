import { Request, Response, NextFunction } from "express";
import { get } from "lodash"; // This is going to make it easier for acessing a  property we dont know if it exists
import { VerifyJwt } from "../utils/jwt.utils";
import { ReIssueRefreshToken } from "../services/session.service.ts";

export const DeserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // const token = req.headers.token;
    // if (!token) {
    //   return res.send({ message: "Unauthorized User Request" });
    // }
    // const { decode, expired } = VerifyJwt(token); //TODO : Try this approach

    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        "",
    );
    // const refreshToken = get(req, "headers.x-refresh"); // Retrieving Refresh Token
    console.log(req.headers);
    // console.log(accessToken);
    if (!accessToken) {
        // why !?
        // res.send({ message: "Token is Required" });
        // console.log("No access Token found in Header");
        return next();
    }

    // console.log("AccessToken", accessToken);
    const { decode, expired, valid } = VerifyJwt(accessToken);
    console.log({ decode, expired, valid });
    // console.log("Decode Result :", decode);
    // console.log("This is ", res.locals.user);
    if (decode) {
        res.locals.user = decode;
        return next();
    }
    // if (expired && refreshToken) {
    //     const newAccessToken = await ReIssueRefreshToken({ refreshToken });
    //     if(newAccessToken){
    //         res.setHeader("x-access-token",newAccessToken)
    //     }
    // }
    // return next();
};
//TODO: Complete Refresh Token Setup
