// all the functionality will come here

import express, { Response, Express, Request, response } from "express";
import User from "../model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 


const getRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, passwd, cPasswd } = await req.body;
    if (!name || !email || !phone || !passwd || !cPasswd) {
      res.status(422).json({ error: "pls fill the registeration form" });
    } else {
      // const userExist= await User.findOne({email:email});

      if (await User.findOne({ email: email })) {
        res
          .status(400)
          .json({ message: `user ${email} is already registered` });
      } else {
        const hashedPasswd = await bcrypt.hash(passwd, 10);

        const user = await User.create({
          name,
          email,
          phone,
          passwd: hashedPasswd,
          cPasswd: hashedPasswd,
        });
        console.log("register successful");
        res
          .status(200)
          .json({ 
            message: `successful, User created `,
            user: user, 
          });
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
      res.status(422).json({ error: "pls fill the Login" });
    } else {
      const user: IUser | null = await User.findOne({ email });
      console.log(user?._id)
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
          process.env.ACCESS_TOKEN_SECRET !,
          { expiresIn: "20d" }
        );

        // cookie
        res.cookie("jwtTokenBablu", accessToken, {
          expires: new Date(Date.now() + 2589000000),
          httpOnly: true,
        });

        console.log("login successfull");
        res.status(200).json({
          msg: user,
          token: accessToken,
          userId: user._id.toString(),
        });
      } else {
        res.status(401).json({ message: " invalid credentials " });
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

const registeruser = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  getRegister,
  getLogin,
  getData,
  getData2,
};
