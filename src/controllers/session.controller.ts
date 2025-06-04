import { Response, Request } from "express";
import { ValidatePassword } from "../services/user.service";
import { CreateSession, FindAllSessions } from "../services/session.service";
import { SignJwt } from "../utils/jwt.utils";
import config from "config";
import { UpdateSession } from "../services/session.service";
export const CreateUserSessionHanlder = async (req: Request, res: Response) => {
    // Validate Users Password
    // // Req.body container the Password , email no need to destructure and you can't destructure as well

    const user = await ValidatePassword(req.body);
    if (!user) {
        res.status(401).send({ message: "Invalid Email or Password" });
        return;
    }
    console.log(user);
    // If this is removed then ts won't know user doesn't exist and it still proceeds with it

    //Create a Session

    // const session = CreateSession(user?._id, req.get("user-agent") || "");

    const session = await CreateSession(
        String(user?._id),
        req.get("user-agent") || "",
    ); // What's the Problem??

    console.log("newly Created Session : ", session);
    //Create an Access Token
    const accessToken = SignJwt(
        {
            ...user,
            session: session._id,
        },

        { expiresIn: config.get("accessTokenttl") },
    );

    //Create a Refresh Token
    const refreshToken = SignJwt(
        {
            ...user,
            session: session._id,
        },
        { expiresIn: config.get("refreshTokenttl") },
    );
    //Return Refresh & Acess Token
    res.send({ refreshToken, accessToken });

    //Implement Cookies
};

// // When you have :  Property '_id' does not exist on type 'Promise<FlattenMaps<{ createdAt: NativeDate; updatedAt:
//  NativeDate; } & { valid: {}; User?: ObjectId | null | undefined; UserAgent?: {} | null | undefined; }
//  & { _id: ObjectId; } & { ...; }>>'. [2339]
// This is due to not using of await basically trying to access an obj value from promsie without awaiting it

export const getUserSessionsHandler = async (req: Request, res: Response) => {
    // const user =  // We for now don't know the user id so we need to get it as we know user would be at request object
    const userId = res.locals.user?._id; //This is going to return undefined as user is undefined so you gotta create a Middleware (RequireUser)

    if (!userId) {
        res.send({ message: "Unauthorized" });
        return;
    }
    const sessions = await FindAllSessions({ User: userId, valid: true }); // valid false cuz we dont want expired sessions
    console.log({ sessions });
    res.send(sessions);
};
//Make sure the Capitalization and follow any notation for not wasting 2hours  lol

export const DeleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session;
    // await;
    //note: Not going to delete the session but going to make the valid as false
    await UpdateSession({ _id: sessionId }, { valid: false });
    console.log("This is Session of User : ", sessionId);
    res.status(200).send({ accessToken: null, refreshToken: null });
};
