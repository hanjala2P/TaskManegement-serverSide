import { Request, Response } from "express";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";
import prisma from "../../utlis/prisma";

const getAdminDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const totalUsers = await prisma.user.count();
  const totalTasks = await prisma.task.count();
  const completedTasks = await prisma.task.count({
    where: { status: "COMPLETED" }, 
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin dashboard stats retrieved successfully!",
    data: {
      totalUsers,
      totalTasks,
      completedTasks,
    },
  });
});

export const AdminController = {
  getAdminDashboardStats,
};