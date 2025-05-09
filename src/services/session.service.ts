import { FilterQuery, UpdateQuery } from "mongoose";
import SesionModel, { SessionDocument } from "../models/session.model";
import { SignJwt, VerifyJwt } from "../utils/jwt.utils.ts";

import config from "config";

import { get } from "lodash"; // This is going to make it easier for acessing a  property we dont know if it exists
import { FindUser } from "./user.service.ts";

export const CreateSession = async (userId: string, UserAgent: string) => {
    const session = await SesionModel.create({
        User: userId,
        // UserAgent: UserAgent,
        UserAgent,
    });
    return session?.toJSON(); // Creates a Session
};

export const FindAllSessions = (query: FilterQuery<SessionDocument>) => {
    return SesionModel.find(query).lean();
};
export const UpdateSession = (
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>,
) => {
    return SesionModel.updateOne(query, update);
};
// Using lean returns a plain js Object whilst not using it would return mongoose document

export const ReIssueRefreshToken = async ({
    refreshToken,
}: {
    refreshToken: string;
}) => {
    //Checking if the User is valid i.e., it has a decoded value
    const { decode } = VerifyJwt(refreshToken);
    if (!decode && get(decode, "_id")) return false;
    //Checking Session related
    const session = await SesionModel.findById(get(decode, "_id"));
    console.log("This is the Service Session : ", session);
    if (!session || !session.valid) return false;
    const user = await FindUser({ _id: session.User });
    console.log("User:", user);
    if (!user) return false;

    const accessToken = SignJwt(
        {
            ...user,
            session: session._id,
        },

        { expiresIn: config.get("accessTokenttl") },
    );
    return accessToken
};
