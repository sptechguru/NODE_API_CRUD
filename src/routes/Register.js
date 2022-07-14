require("dotenv").config();
const express = require("express");
const router = new express.Router();
const RegisterSchema = require("../models/registers");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  try {
    const pass = req.body.password;
    const cpass = req.body.confirm_password;
    if (pass === cpass) {
      const userRegistion = new RegisterSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        phone_Number: req.body.phone_Number,
        password: pass,
        confirm_password: cpass,
      });
      const token = await userRegistion.AuthGenerateToken();
      console.log("token data", token);
      console.log(userRegistion);
      const savedb = await userRegistion.save();
      console.log("page data ", savedb);
      // now get cookies for token through
      // res.cookie("jwt", token, {
      //   expires: new Date(Date.now() + 30000),
      //   httpOnly: true,
      // });
      // console.log("Cookies data ", cookie);
      res.status(201).send(userRegistion);
    } else {
      res.send("Your passwword are Not matching").status(404);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/signup", async (req, res) => {
  // console.log("required",req)
  try {
    const users = await RegisterSchema.find();
    // console.log("get", users);
    res.status(200).send({
      success:true,
      message:"get users Deatils",
      data:users
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"users Deatils not Found",
      data:[]
    });
  }
});

router.post("/login", async (req, res) => {
  // console.log("Email: jitendra@gmail.com", req.body.email);
  try {
    const email = req.body.email;
    const pass = req.body.password;
    console.log(`Email id is ${email} and password is ${pass}`);
    const userCredentials = await RegisterSchema.findOne({ email: email });
    console.log(userCredentials);
    console.log("password", userCredentials.password);
    // userCredentials.password === pass before  normal password condtion used
    // now compare hash password data based & user fill data
    const isMatchHasPass = await bcrypt.compare(pass, userCredentials.password);
    console.log("Match password", isMatchHasPass);
    const token = await userCredentials.AuthGenerateToken();
    console.log("token data", token);

    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 60000),
    //   httpOnly: true,
    //   // secure:true  for using https service secure mode
    // });
    // console.log("Cookies data ", cookie);
    // console.log("Cookies get data ", req.cookies.jwt);

    if (isMatchHasPass) {
      res.status(201).send({
        success:true,
        message:"Login is succesfully",
      });;
    } else {
      res.send({
        success:false,
        message:"Invalid Login Details",
        data:[]
      });
    }
  } catch (error) {
    res.status(400).send({
      success:false,
      message:"Invalid Login Details",
      data:[]
    });
    console.log('login error',error)
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    // 1)  particular data base remove token with using auth midddleware for multiple device
    req.user.tokens = req.user.tokens.filter((item) => {
      return item.token !== req.token;
    });
    // 2)  all device logout for netflix multiple device.
    // req.user.tokens = [];
    console.log(req.user);
    // only clearCookie single device logout
    res.clearCookie("jwt");
    console.log("Logout succesfully..");
    await user.save();
    res.status(201).send("Logout is succesfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
