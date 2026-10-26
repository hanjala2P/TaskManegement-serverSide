import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";

// 1. Create User Controller
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully! 🎉",
    data: result,
  });
});

// 2. Get All Users Controller
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully!",
    data: result,
  });
});

// 3. Get Single User Controller
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

// 4. Update User Controller
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUserInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully! 📝",
    data: result,
  });
});

// 5. Delete User Controller
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully! 🗑️",
    data: result,
  });
});
const updateProfileImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new Error("No file uploaded!");
  }
  const filePath = req.file.path;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File uploaded successfully!",
    data: { filePath },
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateProfileImage
};