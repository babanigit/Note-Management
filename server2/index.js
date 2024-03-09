
const express = require("express");
const dotenv = require("dotenv");
const router = require("./Routes/Routes");
const connectDb = require("./db/connection");




const app = express();
app.use(express.json());
dotenv.config({path:"./.env"});
const port = process.env.PORT //5002

connectDb();

app.use(router);  

// demo
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.get("/hi", (req, res) => {
  res.send("hii expressss");
});

app.listen(port, () => {
  console.log(
    `[server]: hello, my Server is running at http://localhost:${port}`
  );
});
