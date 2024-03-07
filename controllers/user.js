import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "user already existed",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  const userID = await User.create({ name, email, password: hashedPassword });

  sendCookie(userID, res, "Registered Sucessfully", 201);
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid username or password",
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid password",
    });

  sendCookie(user, res, `Welcome Back ${user.name}`, 200);
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
    });
};
