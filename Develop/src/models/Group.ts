import { Schema, model, type Document } from "mongoose";

// Define the IGroup interface for TypeScript
interface IGroup extends Document {
  name: string;
  isPrivate: boolean;
  createdAt: Date;
  users: Schema.Types.ObjectId[]; // Array of ObjectIds referencing the User model
}

// Define the group schema
const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true, // Ensure that the name is required
    },
    isPrivate: {
      type: Boolean,
      default: false, // Default to public group if not specified
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model (Note: "User" is capitalized)
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Enable virtual fields for JSON output
    },
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Group model
const Group = model<IGroup>("Group", groupSchema);

export default Group;
