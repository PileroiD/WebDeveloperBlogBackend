import mongoose from "mongoose";
import * as roles from "../constants/roles.js";

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: roles.USER,
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
