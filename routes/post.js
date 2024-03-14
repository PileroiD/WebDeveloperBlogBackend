import express from "express";
import * as PostController from "../controllers/post.js";
import * as CommentController from "../controllers/comment.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { hasRole } from "../middlewares/hasRole.js";
import mapPost from "../helpers/mapPost.js";
import mapComment from "../helpers/mapComment.js";
import * as roles from "../constants/roles.js";

const postRouter = express.Router({ mergeParams: true });

postRouter.get("/", async (req, res) => {
    try {
        const { posts, lastPage } = await PostController.getPosts(
            req.query.search,
            req.query.limit,
            req.query.page
        );

        res.send({ posts: posts.map(mapPost), lastPage });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(404).send({ error: error.message || "Unknown error" });
    }
});

postRouter.get("/:id", async (req, res) => {
    try {
        const post = await PostController.getOnePost(req.params.id);
        res.send({ data: mapPost(post), error: null });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(404).send({ error: error.message || "Unknown error" });
    }
});

postRouter.post(
    "/",
    /* checkAuth, hasRole([roles.ADMIN] ),*/ async (req, res) => {
        try {
            const data = {
                title: req.body.title,
                image_url: req.body.imageUrl,
                content: req.body.content,
            };

            const post = await PostController.addPost(data);

            res.send({ data: mapPost(post) });
        } catch (error) {
            console.log("error :>> ", error);
            res.status(404).send({ error: error.message || "Unknown error" });
        }
    }
);

postRouter.patch(
    "/:id",
    /* checkAuth,
    hasRole([roles.ADMIN] ),*/
    async (req, res) => {
        try {
            const data = {
                title: req.body.title,
                image_url: req.body.imageUrl,
                content: req.body.content,
            };

            const post = await PostController.editPost(req.params.id, data);

            res.send({ data: mapPost(post) });
        } catch (error) {
            console.log("error :>> ", error);
            res.status(404).send({ error: error.message || "Unknown error" });
        }
    }
);

postRouter.delete(
    "/:id",
    /* checkAuth,
    hasRole([roles.ADMIN] ),*/
    async (req, res) => {
        try {
            await PostController.deletePost(req.params.id);
            res.send({ error: null });
        } catch (error) {
            console.log("error :>> ", error);
            res.status(404).send({ error: error.message || "Unknown error" });
        }
    }
);

// comments
postRouter.post(
    "/:id/comments",
    /* checkAuth ,*/ async (req, res) => {
        try {
            const data = {
                author: req.user._id,
                content: req.body.content,
            };

            const comment = await CommentController.addComment(
                req.params.id,
                data
            );

            res.send({ data: mapComment(comment) });
        } catch (error) {
            console.log("error :>> ", error);
            res.status(404).send({ error: error.message || "Unknown error" });
        }
    }
);

postRouter.delete(
    "/:postId/comments/:commentId",
    /* checkAuth,
    hasRole([roles.ADMIN, roles.MODERATOR] ),*/
    async (req, res) => {
        try {
            await CommentController.deleteComment(
                req.params.postId,
                req.params.commentId
            );
            res.send({ error: null });
        } catch (error) {
            console.log("error :>> ", error);
            res.status(404).send({ error: error.message || "Unknown error" });
        }
    }
);

export default postRouter;
