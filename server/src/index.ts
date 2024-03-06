// const express = require("express");
// const dotenv = require("dotenv");

import express, { Express, Request, Response, Router } from "express";
// import router from "./Routes/Routes"
const app: Express = express();


import dotenv from "dotenv";
import router from "./Routes/Routes";
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 2000; //5002


// app.use(router,require("./Routes/Routes"))
app.use(router);  


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("hii expressss");
});

app.listen(port, () => {
  console.log(
    `[server]: hell my Server is running at http://localhost:${port}`
  );
});
