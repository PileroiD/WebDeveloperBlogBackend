import express from "express";
import * as UserController from "../controllers/user.js";
import mapUser from "../helpers/mapUser.js";

const authRouter = express.Router({ mergeParams: true });

authRouter.post("/register", async (req, res) => {
    try {
        const { user, token } = await UserController.register(
            req.body.login,
            req.body.password
        );

        res.cookie("token", token, { httpOnly: false }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (error) {
        console.log("error :>> ", error);

        if (error.code === 11000) {
            res.status(400).send({ error: "This login already exists" });
            return;
        }

        res.status(400).send({ error: error.message || "Unknown error" });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { user, token } = await UserController.login(
            req.body.login,
            req.body.password
        );

        res.cookie("token", token, { httpOnly: false }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(400).send({ error: error.message || "Unknown error" });
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: false }).send({});
});

export default authRouter;
