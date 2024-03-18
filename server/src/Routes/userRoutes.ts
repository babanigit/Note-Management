import express, { Express, Response, Request } from "express";

import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

import { getData, getData2, getRegister, getLogin,getAuthenticatedUser,getLogout } from "../controllers/userController";


// authenticate
router.route("/").get(getAuthenticatedUser)
// Registration
router.route("/register").post(getRegister)
// login
router.route("/login").post(getLogin)
// logout
router.route("/logout").post(getLogout)


  // demo routes
router.route("/trail").get(getData);
router.route("/getdata").post(getData2);
router.route("/demo").post(async (req, res) => {});

//   module.exports ={
//     router
//   }

export default router;
