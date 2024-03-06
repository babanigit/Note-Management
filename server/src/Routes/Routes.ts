import express, { Express,Response,Request } from "express";
const router= express.Router();
const {getData,getData2} = require("../controller/Controller")


router.route("/trail").get(getData);

router.route("/getdata").post(getData2);


  router.route("/demo").post(async (req, res) => {
    
  });

//   module.exports ={
//     router
//   }

export default router;