import express from "express";
import { TaskController } from "./task.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest"; 
import { TaskValidation } from "./task.validation"; // 

const router = express.Router();

// 1. Create Task 
router.post(
  "/", 
  auth(), 
  validateRequest(TaskValidation.createTaskValidationSchema),
  TaskController.createTask
);

// 2. Get All Tasks
router.get("/", auth(), TaskController.getAllTasks);

// 3. Get Single Task
router.get("/:id", auth(), TaskController.getSingleTask);

// 4. Update Task 
router.patch(
  "/:id", 
  auth(), 
  validateRequest(TaskValidation.updateTaskValidationSchema),
  TaskController.updateTask
);

// 5. Delete Task
router.delete("/:id", auth(), TaskController.deleteTask);

export const TaskRoutes = router;