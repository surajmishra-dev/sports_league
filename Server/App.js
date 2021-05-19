// IMPORTS

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import playerRouter from "./Routes/PlayerRoutes.js";
import teamRouter from "./Routes/TeamRoutes.js";

// APP CONFIGURATION

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const db_url = process.env.DB_URL;

// DB CONNECTION

mongoose
  .connect(db_url, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
  .catch(() => console.log("DB NOT CONNECTED"));

// MIDDLEWARES

app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api", playerRouter);
app.use("/api", teamRouter);

// PORT LISTENING

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
