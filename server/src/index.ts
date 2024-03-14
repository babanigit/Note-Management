

import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import router from "./Routes/Routes";
import connectDb from "./db/connection";
import utilEnv from "./util/validateEnv";
const cors = require("cors");

const app: Express = express();
app.use(express.json());
dotenv.config({path:"./.env"});
const port = process.env.PORT //5002

app.use(cors());


connectDb();

app.use(router);  

// demo
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:"Express.js + Typescript server is live "
  })
});

app.get("/register", (req: Request, res: Response) => {
  res.status(200).json({
    message:"into the registration "
  })
});

app.get("/Login", (req: Request, res: Response) => {
  res.status(200).json({
    message:"into the Login "
  })
});

app.get("/hii", (req: Request, res: Response) => {
  res.send("hii expressss");
});



app.listen(port, () => {
  console.log(
    `[server]: hello, my Server is running at http://localhost:${port}`
  );
});
