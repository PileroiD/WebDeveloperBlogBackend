import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", CommentSchema);
