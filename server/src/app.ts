
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser"

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


import noteRoutes from "./dRoutes/noteRoutes";
import userRouter from "./dRoutes/userRoutes";
import { requiresAuth } from "./middleware/auth";

import path from 'path';


const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser())


// const dirname = path.resolve();

const dirname = path.dirname(path.resolve());
// const parentDirname = path.dirname(dirname);
// const newPath = path.join(parentDirname, path.basename(dirname));
// console.log(newPath);



// app.set("trust proxy", 1); // trust first proxy
app.enable('trust proxy')


// we initialize the session method before routes so that all routes can access the session functions
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
  name: 'MyCoolWebAppCookieName', // This needs to be unique per-host.

  cookie: {
    // secure: true, // required for cookies to work on HTTPS
    httpOnly: false,
    sameSite: 'none',

    maxAge: 60 * 60 * 1000,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE
  })
}));


const corsOptions = {
  origin: "https://note-management-ovgat0io2-aniket-panchals-projects.vercel.app", // frontend URI (ReactJS)
  credentials: true // Allows session cookies to be sent from frontend to backend 
}
app.use(cors(
  corsOptions
  ));



// routes

app.use("/api/users", userRouter)
app.use("/api/notes",requiresAuth, noteRoutes);






// // use the client app
// app.use(express.static(path.join(dirname, "/client/build")));
// console.log(dirname)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(dirname, '/client/build/index.html'));
// });





app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: "note-management api is live ",
      creator: "Aniket panchal (me)"
    });
  } catch (error) {
    next(error);
  }
});


// end point middleware
app.use((res, req, next) => {
  // next(Error("endpoint not found"));

  next(createHttpError(404, "endpoint not found"))
});

// error handler middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "an unknown error occurred";
  let statusCode = 500;
  // if (error instanceof Error) errorMessage = error.message;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});


export default app;