const express = require("express");
const router = express.Router();
const { getData, getData2, getRegister, getLogin } = require("../controller/Controller");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/register").post(getRegister);
router.route("/login").post(getLogin);

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
