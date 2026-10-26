import { Request, Response } from "express";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";
import { AuthService } from "./auth.service";

// Register Controller
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully! 🎉",
    data: result,
  });
});

// Login Controller
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully! 🚀",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
};