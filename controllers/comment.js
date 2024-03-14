import { CommentModel } from "../models/Comment.js";
import { PostModel } from "../models/Post.js";

export const addComment = async (postId, data) => {
    const newComment = await CommentModel.create(data);

    await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: newComment },
    });

    await newComment.populate("author");

    return newComment;
};

export const deleteComment = async (postId, commentId) => {
    await CommentModel.findByIdAndDelete(commentId);

    await PostModel.findByIdAndUpdate(postId, {
        $pull: { comments: commentId },
    });
};
