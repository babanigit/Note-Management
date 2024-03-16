// all the functionality will come here

import express, { Response, Express, Request, response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "console";

const getRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, passwd, cPasswd } = await req.body;
    if (!name || !email || !passwd || !cPasswd) {
      res.status(422).json({
        error: "pls fill the registration form",
        process: 0,
      });
    } else {
      // const userExist= await User.findOne({email:email});

      const userAvailable = await User.findOne({ email });
      if (userAvailable) {
        res.status(400).json({
          message: `user ${email} is already registered`,
          process: 1,
        });
      } else {
        const hashedPasswd = await bcrypt.hash(passwd, 10);
        const user = await User.create({
          name,
          email,
          passwd: hashedPasswd,
          cPasswd: hashedPasswd,
        });

        console.log(`user Created ${email}`);

        // const accessToken = await getRegister.generateToken() ;

        // generate token
        const accessToken = jwt.sign(
          {
            user: {
              name: user.name,
              email: user.email,
              userId: user._id.toString(),
            },
          },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "20d" }
        );

        if (user) {
          res.status(200).json({
            message: `registration successful ${name}`,
            user: user,
            token: accessToken,
            process: 1,
          });
        } else {
          res.status(400).json({
            message: "user data invalid",
            process: 0,
          });
        }

        console.log("register successful");
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
      name: string;
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
              name: user.name,
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
  const { name, phone } = req.body;
  res.status(200).json({ message: `get all contacts ${name} and ${phone} ` });
};

export {
  getRegister,
  getLogin,
  getData,
  getData2,
};
