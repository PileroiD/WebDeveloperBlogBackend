import mongoose from "mongoose";
import mapComment from "./mapComment.js";

export default function (post) {
    return {
        id: post._id,
        title: post.title,
        imageUrl: post.image_url,
        comments: post.comments.map((comment) =>
            mongoose.isObjectIdOrHexString(comment)
                ? comment
                : mapComment(comment)
        ),
        content: post.content,
        publishedAt: post.createdAt,
    };
}
