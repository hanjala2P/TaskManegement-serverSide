import prisma from "../../utlis/prisma";
import { ITask } from "./task.interface";

// 1. Create Task
const createTaskIntoDB = async (payload: ITask) => {
  const result = await prisma.task.create({
    data: payload,
  });
  return result;
};

// 2. Get All Tasks (Supports Pagination, Searching, and Filtering by Status & Priority)
const getAllTasksFromDB = async (query: Record<string, unknown>) => {
  const { page = 1, limit = 10, searchTerm, status, priority } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const conditions: any = [];

 
  if (searchTerm) {
    conditions.push({
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  
  if (status) {
    conditions.push({ status });
  }


  if (priority) {
    conditions.push({ priority });
  }

  const whereConditions = conditions.length > 0 ? { AND: conditions } : {};

  
  const result = await prisma.task.findMany({
    where: whereConditions,
    skip,
    take: limitNumber,
    orderBy: { createdAt: "desc" },
  });

  
  const total = await prisma.task.count({ where: whereConditions });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
    data: result,
  };
};

// 3. Get Single Task
const getSingleTaskFromDB = async (id: string) => {
  const result = await prisma.task.findUnique({
    where: { id },
  });
  return result;
};

// 4. Update Task
const updateTaskInDB = async (id: string, payload: Partial<ITask>) => {
  const result = await prisma.task.update({
    where: { id },
    data: payload,
  });
  return result;
};

// 5. Delete Task
const deleteTaskFromDB = async (id: string) => {
  const result = await prisma.task.delete({
    where: { id },
  });
  return result;
};

export const TaskService = {
  createTaskIntoDB,
  getAllTasksFromDB,
  getSingleTaskFromDB,
  updateTaskInDB,
  deleteTaskFromDB,
};