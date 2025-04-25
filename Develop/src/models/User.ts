import { Schema, model, type Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  groups: Schema.Types.ObjectId[]; // Array of ObjectIds referencing Group model
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group", // Reference to the Group model
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

const User = model<IUser>("User", userSchema);

export default User;
