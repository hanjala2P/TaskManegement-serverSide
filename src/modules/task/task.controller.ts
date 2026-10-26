import { Request, Response } from "express";
import { TaskService } from "./task.service";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";

// 1. Create Task
const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.createTaskIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully! 📝",
    data: result,
  });
});

// 2. Get All Tasks (Supports Pagination, Searching & Filtering)
const getAllTasks = catchAsync(async (req: Request, res: Response) => {
লো
  const result = await TaskService.getAllTasksFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks retrieved successfully!",
    meta: result.meta, 
    data: result.data, // মূল টাস্কের অ্যারে
  });
});

// 3. Get Single Task
const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TaskService.getSingleTaskFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task retrieved successfully!",
    data: result,
  });
});

// 4. Update Task
const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TaskService.updateTaskInDB(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task updated successfully!",
    data: result,
  });
});

// 5. Delete Task
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TaskService.deleteTaskFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted successfully!",
    data: result,
  });
});

export const TaskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};