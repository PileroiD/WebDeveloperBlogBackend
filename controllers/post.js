import { PostModel } from "../models/Post.js";

export const addPost = async (data) => {
    const post = await PostModel.create(data);

    await post.populate({
        path: "comments",
        populate: "author",
    });

    return post;
};

export const editPost = (id, newData) => {
    return PostModel.findByIdAndUpdate({ _id: id }, newData, {
        returnDocument: "after",
    }).populate({
        path: "comments",
        populate: "author",
    });
};

export const deletePost = (id) => {
    return PostModel.findByIdAndDelete(id);
};

// get list of posts with search and pagination
export const getPosts = async (search = "", limit = 10, page = 1) => {
    const [posts, amountOfPages] = await Promise.all([
        PostModel.find({ title: { $regex: search, $options: "i" } })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        PostModel.countDocuments({ title: { $regex: search, $options: "i" } }),
    ]);

    return {
        posts,
        lastPage: Math.ceil(amountOfPages / limit),
    };
};

export const getOnePost = async (id) => {
    return PostModel.findById(id).populate({
        path: "comments",
        populate: "author",
    });
};
