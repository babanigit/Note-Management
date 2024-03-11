const express = require("express");
const router = express.Router();
const { getData, getData2, getRegister, getLogin } = require("../controller/Controller");
const connectDb =  require("../db/connection");



// require("../db/connection");



const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// connectDb();


// router.route("/register").post(getRegister);
// router.route("/login").post(getLogin);

router.post("/register", async (req, res) => {

  try {

  // this is request from postman or data stored using postman or the frontend
  const { name, email, phone, passwd, cPasswd } = await req.body;

  // those three lines are for checking if postman is working properly or not??
  console.log("name is : " + name);
  console.log("email is : " + email);
  // res.json({ message: req.body });

  if (!name || !email || !phone || !passwd || !cPasswd) {
    // status(422)  this will give u error type
    return res.status(422).json({ error: "pls fill the registration" });
  }
  else {

    // note:- the below code gives u error cause its calling body twice , idk exactly yyy ,cause u cant call two res 
    // res.json({ message: req.body });

 
    const userExist = await User.findOne({ email: email });
    console.log(userExist);

    if (userExist)
      return res.status(422).json({ error: "email already registereddd" });
    else if (passwd != cPasswd)
      return res.status(422).json({ error: "password are not matching " });
    else {
      const user = new User({ name, email, phone, passwd, cPasswd });

      // password hashing
      await user.save();

      res
      .status(201)
      .json({ message: "user registered successfully in backendddddd" } );
    }

   
      
  }

  
  } catch (err) {
    console.log(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"awesome"});

  try {
    const { email, passwd } = await req.body;

    if (!email || !passwd) {
      return res.status(400).json({ error: "null data, please fill the data" });
    }

    // for getting the email data from database
    // first email is backend and second is from frontend
    // it will search for u the email u mentioned

    // and it will store the whole register data in userLogin
    const userLogin = await User.findOne({ email: email });
    console.log("userLogin data")
    console.log(userLogin);

    // this /if' is to check login credentials...
    if (userLogin) {

      // bcrypt.compare will return boolean
      // userLogin.password from whole registered data 

      // for example this ....

      // {
      //   _id: new ObjectId('65bb88cf1370b1194aa057da'),
      //   name: 'aniket panchal',
      //   email: 'mikasa7@gmail.com',
      //   phone: 1234567889,
      //   work: 'mern-dev',
      //   password: '$2a$12$tL0yF2qs3Dp8zMD.tZHqCe/PH8Ugx4UVZoY1fuuA.phT/2veurzie',
      //   cPassword: '$2a$12$eUELCJNgnDP22b57fIPqL.Sk9EzGhlr1f/vB/1KnrKJjV9rT0.hbq'

      const isMatch = await bcrypt.compare(passwd, userLogin.passwd);

    

      // this 'if statement' is for checking passwd credentials...
      if (!isMatch) {
        // res.json({ error: "user error" });
        res.status(400).json({ error: "invalid credentials pass " });
      } else {

      //     // jsonwebtoken
      // const token = await userLogin.generateAuthToken();
      // console.log("singIn TOKEN is...");
      // console.log(token); 

      // // storing to cookie
      // // cookie
      // res.cookie("jwtTokenBablu", token , {
      //   expires: new Date(Date.now() + 2589000000),
      //   httpOnly: true
      // });

        res.json({ 
          message: "user Signing Successfully",
          
          user:userLogin,
      
      });
      }


    } else {
      res.status(400).json({ error: "invalid credentials user " });
    }

  } catch (err) {
    console.log(err);
  }
});


router.post("/login2", async (req, res) => {
    try {
      const { email, passwd } = req.body;
  
      if (!email || !passwd) {
        res.status(422).json({ error: "pls fill the Login from login2" });
      } else {
        const user = await User.findOne({ email });
  
        if (user && (await bcrypt.compare(passwd, user.passwd))) {
          const accessToken = jwt.sign(
            {
              user: {
                name: user.name,
                email: user.email,
                userId: user._id.toString(),
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20d" }
          );
  
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
  });

router.route("/trail").get(getData);
router.route("/getdata").post(getData2);
router.route("/demo").post(async (req, res) => {});

module.exports = router;
