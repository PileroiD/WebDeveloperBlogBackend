import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.js";

dotenv.config();
const db = process.env.DB;

const port = 3001;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: ["https://web-developer-blog-frontend-26pbwxmld.vercel.app"],
        credentials: true,
        methods: ["GET", "PATCH", "POST", "DELETE"],
        allowedHeaders: [
            "Access-Control-Allow-Origin",
            "Content-Type",
            "Authorization",
        ],
    })
);

app.use("/", router);

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log("DB ok");
    })
    .catch((error) => {
        console.log("DB error: ", error);
    });

app.listen(process.env.PORT || 3001, (error) => {
    if (error) {
        return console.log(error);
    }

    console.log("Server OK");
});
