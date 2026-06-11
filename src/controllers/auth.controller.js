import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";
import catchAsync from "../utils/catchAsync.js";
import { HTTP_STATUS } from "../utils/constant.js";

export const register = catchAsync(async (req, res, next) => {
  const { user, accessToken, refreshToken } = await registerUser(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
     maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  successResponse(
    res,
    "User created successfully",
    { user, accessToken },
    HTTP_STATUS.CREATED,
  );
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser(email, password);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  successResponse(res, "Login successfull", { user, accessToken }, HTTP_STATUS.OK);
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const  refreshToken  = req.cookies?.refreshToken;
  const { accessToken, user } = await refreshAccessToken(refreshToken);

  successResponse(res, "Token refreshed successfully", {
    accessToken,
    user,
  });
});

export const logout = catchAsync(async (req, res, next) => {
  await logoutUser(req.user._id);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  successResponse(res, "Logged out successfully");
});
