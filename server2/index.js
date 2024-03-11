
const express = require("express");

const cors = require("cors");

const app = express();

const dotenv = require("dotenv");

dotenv.config({path:"./.env"});

app.use(cors());

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



app.listen(port, () => {
  console.log(
    `server running ar ${port}`
    );
});

module.exports = app;
