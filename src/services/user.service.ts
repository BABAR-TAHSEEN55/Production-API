import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";
import { FilterQuery } from "mongoose";
type CreateUserInput = Pick<UserDocument, "email" | "name" | "password">;
export async function createUserIn(input: CreateUserInput) {
    try {
        // return await UserModel.create(input);
        const user = await UserModel.create(input);
        console.log(user); // This created User in the DB
        return user;
    } catch (error) {
        console.log("Error : ", error);
        // throw new Error("I dont know");
        // console.log("This is the Error from Services");
    }
}
export const ValidatePassword = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        console.log("User doesn't exists");
        return false;
    }
    const isValid = await user.comparePassword(password);

    if (!isValid) return false;
    return omit(user?.toJSON(), "password");
    //Returns the User but wihtout password after confirming the User's Identity
};

export const FindUser =  (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query).lean();
};
