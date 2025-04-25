import { Schema, model } from "mongoose";
// Define the group schema
const groupSchema = new Schema({
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
}, {
    toJSON: {
        virtuals: true, // Enable virtual fields for JSON output
    },
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
// Create and export the Group model
const Group = model("Group", groupSchema);
export default Group;
