import express from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import postRouter from "./post.js";

const router = express.Router({ mergeParams: true });

router.use("/", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
