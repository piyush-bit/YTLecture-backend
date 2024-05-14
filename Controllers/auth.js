import mongoose from "mongoose";
import User from "../Models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import validateEmail, { extractUsername } from "../utils/Email.js";


//signup 
export const signup = async (req, res, next) => {
  console.log("inside signup");
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if(!validateEmail(req.body.email)){
      res.status(400).send("Invallid Email")
      next();
      return
    }

    const u = await User.findOne({email: req.body.email})
    console.log(u);
    if(u.length!=0){
      res.status(409).send("User already exists")
      next();
      return
    }
    const newUser = new User({ name:req.body.name,email:req.body.email, password: hash , username : extractUsername(req.body.email) });

    await newUser.save();
    res.status(201).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

//signin
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        username: user.username,
        img: user.img,
        email: user.email,
      },
      process.env.JWT,
      { expiresIn: "15d" }
    );
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure : true
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

//signout
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      // domain: process.env.CORS_ADD
      domain: 'localhost , netlify.app',
    });
    res
      .status(200).json({message : "done"});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error });
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        {
          id: savedUser._id,
          name: savedUser.name,
          username: savedUser.username,
          img: savedUser.img,
        },
        process.env.JWT
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
