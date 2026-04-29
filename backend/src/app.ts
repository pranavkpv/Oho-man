import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";
import { API } from "./constant/api";

import authRoute from "./routes/auth.route"

import userRoute from "./routes/user.route"
import env from "./config/env";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(API.AUTH_BASE, authRoute);
app.use(API.USER_BASE, userRoute)

app.use(notFound);
app.use(errorHandler);

export default app;