

import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import router from "./Routes/Routes";
import connectDb from "./db/connection";

const app: Express = express();
app.use(express.json());
dotenv.config({path:"./.env"});
const port = process.env.PORT || 2000; //5002

connectDb();

app.use(router);  

// demo
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("hii expressss");
});

app.listen(port, () => {
  console.log(
    `[server]: hello, my Server is running at http://localhost:${port}`
  );
});
