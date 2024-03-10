
const express = require("express");

const cors = require("cors");

const app = express();

const dotenv = require("dotenv");

dotenv.config({path:"./.env"});

const connectDb =  require("./db/connection");
connectDb()

app.use(express.json());

const router = require("./Routes/Routes");

const port = process.env.PORT //5003


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
    "running on server 5002"
    );
});

module.exports = app;
