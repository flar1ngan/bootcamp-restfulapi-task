import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({ ...req.body, isAdmin: false, password: hash });
    await newUser.save();
    res.status(201).send("new user created");
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("Wrong username or password");
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    ); // await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
      res.status(404).send("Wrong username or password");
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("session_token", token, {
        httpOnly: true,
      })
      .status(201)
      .send(`Successfully logged in`);
  } catch (error) {
    console.error(error);
  }
};