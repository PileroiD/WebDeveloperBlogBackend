import mongoose from "mongoose";
import validator from "validator";

const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
            validate: {
                validator: validator.isURL,
                message: "Invalid type of image, should be a URL",
            },
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        content: {
            type: String,
            requireq: true,
        },
    },
    { timestamps: true }
);

export const PostModel = mongoose.model("Post", PostSchema);
