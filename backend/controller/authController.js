import User from "../model/userModel.js";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

const signUpController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }
  try {
    const isUserExsiting = await User.findOne({ email });
    if (isUserExsiting) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }
  try {
    const isUserExsiting = await User.findOne({ email });
    if (!isUserExsiting) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordMatched = await isUserExsiting.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const jwtToken = jwt.sign(
      { _id: isUserExsiting._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const userDetails = isUserExsiting.toObject();
    delete userDetails.password;
    res.status(200).json({
      success: true,
      token: jwtToken,
      userDetails: userDetails,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error,
      success: false,
      message: "Internal server error",
    });
  }
};

export { signUpController, loginController };
