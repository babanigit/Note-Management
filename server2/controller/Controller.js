const express = require("express");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getRegister = async (req, res) => {
  try {
    const { name, email, phone, passwd, cPasswd } = req.body;
    if (!name || !email || !phone || !passwd || !cPasswd) {
      res.status(422).json({ error: "pls fill the registration form" });
    } else {
      if (await User.findOne({ email: email })) {
        res.status(400).json({ message: `user ${email} is already registered` });
      } else {
        const hashedPasswd = await bcrypt.hash(passwd, 10);
        const user = await User.create({
          name,
          email,
          phone,
          passwd: hashedPasswd,
          cPasswd: hashedPasswd,
        });

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

        console.log("register successful");
        res.status(200).json({
          message: `registration successful from server `,
          user: user,
          token: accessToken,
        });
      }
    }
  } catch (error) {
    console.log("error in /register");
    console.error(error);
  }
};

const getLogin = async (req, res) => {
  try {
    const { email, passwd } = req.body;
    if (!email || !passwd) {
      res.status(400).json({ message: "all field required" });
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
          user: user,
          message: "Login successful from server",
          token: accessToken,
        });
      } else {
        res.status(404).json({ message: " invalid credentials " });
      }
    }
  } catch (error) {
    console.log("error in /login");
    console.error(error);
  }
};

const getData = (req, res) => {
  res.status(200).json({ message: "get all contacts " });
};

const getData2 = (req, res) => {
  const { name, phone } = req.body;
  res.status(200).json({ message: `get all contacts ${name} and ${phone} ` });
};

module.exports = {
  getRegister,
  getLogin,
  getData,
  getData2,
};
