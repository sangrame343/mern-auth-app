import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10); //random char of hard combined and create hashed password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save(); //save the data in database
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validateUser = await User.findOne({ email });
    if (!validateUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcryptjs.compare(
      password,
      validateUser.password
    );
    if (!validPassword) return next(errorHandler(400, "Wrong Password"));
    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET);
    // res.json({ token, id: validateUser._id });
    const { password: hashedPassword, ...rest } = validateUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validateUser);
  } catch (err) {
    next(err);
  }
};
