import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";

const app = express();

app.use(
 cors({
   origin: "http://localhost:3000",
   credentials: true
 })
);

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(cookieParser());

// app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;