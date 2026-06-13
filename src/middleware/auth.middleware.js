import AppError from "../errors/AppError.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import User from "../models/user.model.js";
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }


    if (!token) {
      throw new AppError("Authorization fail , please login again", 401);
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("User dont exist in this token", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new AppError("Invalid token please login again", 401));
    } else if (error.name === "TokenExpiredError") {
      next(new AppError("Token expired, please login again", 401));
    } else {
      next(error);
    }
  }
};
