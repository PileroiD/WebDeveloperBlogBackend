import express from "express";
import * as UserController from "../controllers/user.js";
import mapUser from "../helpers/mapUser.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { hasRole } from "../middlewares/hasRole.js";
import * as roles from "../constants/roles.js";

const userRouter = express.Router({ mergeParams: true });

userRouter.get("/", checkAuth, hasRole([roles.ADMIN]), async (req, res) => {
    try {
        const users = await UserController.getUsers();
        res.send({ data: users.map(mapUser), error: null });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(400).send({ error: error.message || "Unknown error" });
    }
});

userRouter.get("/roles", checkAuth, hasRole([roles.ADMIN]), (req, res) => {
    try {
        const roles = UserController.getRoles();

        res.send({ data: roles, error: null });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(400).send({ error: error.message || "Unknown error" });
    }
});

userRouter.patch(
    "/:id",
    checkAuth,
    hasRole([roles.ADMIN]),
    async (req, res) => {
        try {
            const updatedUser = await UserController.updateUser(req.params.id, {
                role: req.body.roleId,
            });

            res.send({ data: mapUser(updatedUser) });
        } catch (error) {
            console.log("error :>> ", error);
            res.status(400).send({ error: error.message || "Unknown error" });
        }
    }
);

userRouter.delete("/:id", checkAuth, hasRole([roles.ADMIN]), (req, res) => {
    try {
        UserController.deleteUser(req.params.id);
        res.send({ success: true });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(400).send({ error: error.message || "Unknown error" });
    }
});

export default userRouter;
