
const express = require("express");
const dotenv = require("dotenv");
const router = require("./Routes/Routes");
const connectDb = require("./db/connection");
const cors = require("cors");





const app = express();
app.use(express.json());
dotenv.config({path:"./.env"});
const port = process.env.PORT //5003

connectDb();

app.use(router);  

// demo
app.get("/", (req, res) => {
  res.send("Express + javascript ");
});

app.get("/hi", (req, res) => {
  res.send("hii expressss");
});

app.use(cors());

app.listen(port, () => {
  console.log(
    `[server]: hello, my Server is running at http://localhost:${port}`
  );
});

module.exports = app;
