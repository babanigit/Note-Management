import express, { Express, NextFunction, Request, Response } from "express";
// import express,{Express,Request,Response} from "express"
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./db/connection";

import noteRoutes from "./Routes/noteRoutes";
import userRouter from "./Routes/userRoutes";
import createHttpError,{isHttpError} from "http-errors";
import session from "express-session";
import MongoStore = require("connect-mongo");

dotenv.config({ path: "./.env" });
const port = process.env.PORT;
const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// import utilEnv from "./util/validateEnv";

  connectDb();

app.use(session({
  secret: process.env.SESSION_SECRET || " ",
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:60 * 60 * 1000,
  },
  rolling:true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE
  })
}));

// routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRouter)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: "Express.js + Typescript server is live ",
    });
  } catch (error) {
    next(error);
  }
});


// end point middleware
app.use((res, req, next) => {
  // next(Error("endpoint not found"));

  next(createHttpError(404,"endpoint not found"))
});

// error handler middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "an unknown error occurred";
  let statusCode=500;
  // if (error instanceof Error) errorMessage = error.message;
  if(isHttpError(error)){
    statusCode=error.status;
    errorMessage=error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => {
  console.log(
    `[server]: hello, my Server is running at http://localhost:${port}`
  );
});