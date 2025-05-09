import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "config"; // Why is the config being imported ?
//Find about TypeGoose
export interface UserDocument extends mongoose.Document {
    email: string; // What is the diff b/w String & string
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new mongoose.Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
//Adding a Pre-Save hook , in case data base is compromised ,Users passwords  are not leaked
UserSchema.pre("save", async function (next) {
    let user = this as UserDocument;
    console.log("This is the best NEovim COnfgi");
    if (!user.isModified("password")) {
        // Avoids Re-Hashing of Password if the password is already hashed
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("SaltWorkFactor"));
    const Hash = await bcrypt.hash(user.password, salt);
    user.password = Hash;
    return next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string,
): Promise<boolean> {
    // As it is an Async fun. its a promise
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};
const UserModel = mongoose.model<UserDocument>("User", UserSchema); //Takes a generic , if not mentioned causes problems when validation of password
export default UserModel;
