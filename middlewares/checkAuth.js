import { verify } from "../helpers/token.js";
import { UserModel } from "../models/User.js";

export const checkAuth = async (req, res, next) => {
    try {
        const tokenData = verify(
            res.headers.get("Set-Cookie").split(";")[0].split("=")[1]
        );

        const user = await UserModel.findById({ _id: tokenData.id });

        if (!user) {
            res.send({ error: "Authenticated user is not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("error :>> ", error);
        res.status(400).send({
            error: "Access denied",
        });
    }
};
