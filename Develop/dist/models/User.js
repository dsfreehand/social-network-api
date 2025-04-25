import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt
});
const User = model("User", userSchema);
export default User;
