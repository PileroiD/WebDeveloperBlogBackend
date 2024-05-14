import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.js";

dotenv.config();
const db = process.env.MONGO_DB;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/", router);

mongoose
    .connect(db)
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
