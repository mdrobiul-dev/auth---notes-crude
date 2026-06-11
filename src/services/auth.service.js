import AppError from "../errors/AppError.js";
import User from "../models/user.model.js";
import { HTTP_STATUS } from "../utils/constant.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User with this email already exist", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = await user.generateToken();
  const refreshToken = await generateRefreshToken(user)

  const userRespone = user.toSafeObject();

  return { user: userRespone, accessToken: token, refreshToken };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZE);
  }

  const token = await user.generateToken();
   const refreshToken = await generateRefreshToken(user)

  const userResponse = user.toSafeObject();

  return { user: userResponse, accessToken: token, refreshToken };
};

export const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ id: user.id }, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expiresIn,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return refreshToken;
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new AppError('Refresh token required', 401);

  const decoded = jwt.verify(refreshToken, config.jwt.refresh_secret);
  const user = await User.findOne({ _id: decoded.id, refreshToken });

  if (!user) throw new AppError('Invalid or expired refresh token', 401);

  const newAccessToken = user.generateToken();
  return { accessToken: newAccessToken, user };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};
