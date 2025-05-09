import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  User: UserDocument["_id"];
  valid: boolean;
  UserAgent: string;
  createdAt: Date;
  updatedAt: Date;
}
const SessionSchema = new mongoose.Schema( // Why not <SessionDocument> ?
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing User Model
    },
    valid: {
      type: Boolean,
      default: true, //can define schemas for Certain Paths
      // Example use of default ?
    },
    UserAgent: {
      type: String, // Used to store users browser in which the session was created by the user
    },
  },
  { timestamps: true },
);
const SesionModel = mongoose.model("Session", SessionSchema);
export default SesionModel;
// Why solving String .not string works ?
