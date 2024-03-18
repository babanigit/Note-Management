// all the functionality will come here

import express, { Response, Express, Request, response, NextFunction } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "console";
import createHttpError from "http-errors";

const getRegister = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { userName, email, passwd, cPasswd } = await req.body;  
    if (!userName || !email || !passwd || !cPasswd) {

      res.status(200).json({message:"parameters missing"});
      throw createHttpError(400,"parameters missing");
      res.status(422).json({
        error: "pls fill the registration form",
        process: 0,
      });

    } 
    
    else {
      // const userExist= await User.findOne({email:email});

      const existingUserEmail = await User.findOne({ email:email });
      if (existingUserEmail) {

        res.status(200).json({message:"email is already taken"});
        throw createHttpError(409,"email is already taken!")
        res.status(400).json({
          message: `user ${email} is already registered`,
          process: 1,
        });
      } 
      
      const existingUserUserName = await User.findOne({ userName:userName });
      if (existingUserUserName) {

        res.status(200).json({message:"username is already taken"});
        throw createHttpError(409,"username is already taken!")
      }
      
      else {

        if (passwd!==cPasswd) {
          res.status(200).json({message:"confirm password is not matching"});
          throw createHttpError(400,"confirm password is not matching")
        }

        // password hashing
        const hashedPasswd = await bcrypt.hash(passwd, 10);

        const newUser = await User.create({
          userName,
          email,
          passwd: hashedPasswd,
          cPasswd: hashedPasswd,
        });

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
    console.log("error in /register");
    console.error(error);
  }
};

const getLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    interface IUser {
      email: string;
      passwd: string;
      userName: string;
      _id: string;
    }

    const { email, passwd } = await req.body;

    if (!email || !passwd) {
      res.status(400).json({
        message: "all field required",
        process: 0,
      });
    } else {
      const user: IUser | null = await User.findOne({ email });

      if (user && (await bcrypt.compare(passwd, user.passwd))) {
        // token
        const accessToken = jwt.sign(
          {
            user: {
              userName: user.userName,
              email: user.email,
              userId: user._id.toString(),
            },
          },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "20d" }
        );

        // // cookie
        // res.cookie("jwtTokenBablu", accessToken, {
        //   expires: new Date(Date.now() + 2589000000),
        //   httpOnly: true,
        // });

        res.status(200).json({
          user: user,
          message: "Login successful from server",
          token: accessToken,
          process: 1,
        });
      } else {
        res.status(404).json({
          message: " invalid credentials ",
          process: 0,
        });
      }
    }
  } catch (error) {
    console.log("error in /login");
    console.error(error);
  }
};

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
