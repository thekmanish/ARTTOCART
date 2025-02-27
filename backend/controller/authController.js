import User from "../model/userModel.js";

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
      user,
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

const loginController = async (req, res) => {};

export { signUpController, loginController };
