import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.JWT_KEY;

const generate = (data) => {
    return jwt.sign(data, key, { expiresIn: "30d" });
};

const verify = (token) => {
    return jwt.verify(token, key);
};

export { generate, verify };
