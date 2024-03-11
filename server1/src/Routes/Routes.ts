import express, { Express, Response, Request } from "express";

import User from "../model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const { getData, getData2, getRegister, getLogin } = require("../controller/Controller");

// Registration
router.route("/register").post(getRegister)

// login
router.route("/login").post(getLogin)


// for login2
router.post("/login2", async (req: Request, res: Response): Promise<void> => {
    try {
      interface IUser {
        email: string;
        passwd: string;
        name: string;
        _id: string;
      }
  
      const { email, passwd } = await req.body;

      console.log(email , passwd)
  
      if (!email || !passwd) {
        
        res.status(422).json({ error: "pls fill the Login from login2" });

      } else {
        const user: IUser | null = await User.findOne({ email });
        console.log(user?._id);
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
  
          console.log("login successful");
          res.status(200).json({
            message: "Login successful from server",
            user: user,
            token: accessToken,
          });
        } else {
          res.json({ message: " invalid credentials " });
        }
      }
    } catch (error) {
      console.log("error in /login2");
      console.error(error);
    }
  })

router.route("/trail").get(getData);

router.route("/getdata").post(getData2);

router.route("/demo").post(async (req, res) => {});

//   module.exports ={
//     router
//   }

export default router;
