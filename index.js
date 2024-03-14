import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.js";

// dotenv.config();
// const db = process.env.DB;

const port = 3001;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/", router);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("DB ok");

        app.listen(process.env.PORT || 3001, (error) => {
            if (error) {
                return console.log(error);
            }

            console.log("Server OK");
        });
    })
    .catch((error) => {
        console.log("DB error: ", error);
    });
