// all the functionality will come here

import express, { Response, Express, Request, response, NextFunction, RequestHandler } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "console";
import createHttpError from "http-errors";

export const getAuthenticatedUser:RequestHandler = async(req,res,next)=> {

  const getAuthenticated = req.session.userId;

  try {
    if(!getAuthenticated) {
      throw createHttpError(401,"user not authenticated")
    }
    const user=await User.findById(getAuthenticated).select("+email").exec();
    res.status(200).json(user)

  } catch (error) {
    next(error)
    console.error(error)
  }
}


// interface User {
//   _id: string;
//   userName: string;
//   email: string;
//   passwd: string;
//   cPasswd: string;
//   createdAt: Date;
//   updatedAt: Date;
//   __v: number;
// }


const getRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userName, email, passwd, cPasswd } = await req.body;
    if (!userName || !email || !passwd || !cPasswd) {

      throw createHttpError(400, "parameters missing");
      res.status(422).json({
        error: "pls fill the registration form",
        process: 0,
      });

    }

    else {
      // const userExist= await User.findOne({email:email});

      const existingUserEmail = await User.findOne({ email: email });
      if (existingUserEmail) {

        throw createHttpError(409, "email is already taken!")
        res.status(400).json({
          message: `user ${email} is already registered`,
          process: 1,
        });
      }

      const existingUserUserName = await User.findOne({ userName: userName });
      if (existingUserUserName) {

        throw createHttpError(409, "username is already taken!")
      }

      else {

        if (passwd !== cPasswd) {
          throw createHttpError(400, "confirm password is not matching")
        }

        // password hashing
        const hashedPasswd = await bcrypt.hash(passwd, 10);

        const newUser = await User.create({
          userName,
          email,
          passwd: hashedPasswd,
          cPasswd: hashedPasswd,
        });

        req.session.userId = newUser._id;

        res.status(200).json(newUser);

        // console.log(`user Created ${email}`);
        // res


        // // generate token
        // const accessToken = jwt.sign(
        //   {
        //     user: {
        //       userName: newUser.username,
        //       email: newUser.email,
        //       userId: newUser._id.toString(),
        //     },
        //   },
        //   process.env.ACCESS_TOKEN_SECRET!,
        //   { expiresIn: "20d" }
        // );

        // if (newUser) {
        //   res.status(200).json({
        //     message: `registration successful ${userName}`,
        //     user: newUser,
        //     token: accessToken,
        //     process: 1,
        //   });
        // } else {
        //   res.status(400).json({
        //     message: "user data invalid",
        //     process: 0,
        //   });
        // }

        // console.log("register successful");

      }
    }

  } catch (error) {
    console.error(error);
    next(error)
  }
};

interface IUser {
  passwd?: string;
  userName?: string;
}


const getLogin: RequestHandler<unknown, unknown, IUser, unknown> = async (req, res, next) => {

  // const { userName, passwd } = await req.body;

  const userName = req.body.userName;
  const passwd = req.body.passwd;


  try {
    if (!userName || !passwd) {

      throw createHttpError(400, "Parameters missing")
      res.status(400).json({
        message: "all field required",
        process: 0,
      });

    } else {
      const user = await User.findOne({ userName: userName }).select("+passwd +email").exec();

      if (!user) {
        throw createHttpError(401, "invalid credentials")
      }

      if (typeof passwd !== 'string' || typeof user.passwd !== 'string') {
        throw new Error("Password or user password is not a string");
      }

      const passwdMatch = bcrypt.compare(passwd, user.passwd);

      if (!passwdMatch) {
        throw createHttpError(401, "invalid credentials")
      }
      req.session.userId = user._id;
      res.status(201).json(user)

    }
  } catch (error) {

    next(error)
    console.error(error);
  }
};

// logout
export const getLogout:RequestHandler= (req,res,next)=> {
  req.session.destroy(error=>{
    if (error) {
      next(error)
    }else {
      res.sendStatus(200);
    }
  })
}


const getData = (req: Request, res: Response) => {
  res.status(200).json({ message: "get all contacts " });
};

const getData2 = (req: Request, res: Response) => {
  const { userName, phone } = req.body;
  res.status(200).json({ message: `get all contacts ${userName} and ${phone} ` });
};

export {
  getRegister,
  getLogin,
  getData,
  getData2,
};
