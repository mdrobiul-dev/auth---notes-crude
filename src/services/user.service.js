import AppError from "../errors/AppError.js";
import User from "../models/user.model.js";

export const getUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError("User not found", 404);

  const userObj = user.toSafeObject();

  return userObj;
};

export const updateProfileUser = async (userId, userData) => {
  const { name, password } = userData;

  const user = await User.findById(userId);

  if (!user) throw new AppError("User not found", 404);

  if (name) user.name = name;
  if (password) user.password = password;

  await user.save();

  const updatedUserObj = user.toSafeObject();

  return updatedUserObj;
};

export const getAllUser = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new AppError("User not found", 400);

  return user;
};                                   
                     