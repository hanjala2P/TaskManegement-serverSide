import { Request, Response, NextFunction } from "express";
import AppError from "../middleware/AppError";
import { TErrorSources } from "../interface/error"; 

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = error.message || "Something went wrong!";
  
  let errorSources: TErrorSources[] = [
    {
      path: "",
      message: error.message || "Something went wrong!",
    },
  ];

  // ১. Zod Validation Error হ্যান্ডেল করা
  if (error.name === "ZodError") {
    statusCode = 400;
    message = "Validation Error";
    errorSources = error.issues.map((issue: any) => ({
      path: issue.path[issue.path.length - 1] || "",
      message: issue.message,
    }));
  } 
  // ২. Custom AppError হ্যান্ডেল করা
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } 
  // ৩. Prisma Record Not Found (P2025)
  else if (error.code === "P2025") {
    statusCode = 404;
    message = "Requested record not found in the database!";
    errorSources = [
      {
        path: "",
        message: "Requested record not found in the database!",
      },
    ];
  } 
  // ৪. Prisma Unique Constraint Violation (P2002)
  else if (error.code === "P2002") {
    statusCode = 400;
    message = "Duplicate value error! This record already exists.";
    errorSources = [
      {
        path: "",
        message: "Duplicate value error! This record already exists.",
      },
    ];
  }

  // ৫. ফাইনাল রেসপন্স পাঠানো
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // প্রোডাকশনে মেইন এরর অবজেক্ট বা স্ট্যাক হাইড রাখাই ভালো
    error: process.env.NODE_ENV === "development" ? error : undefined,
  });
};

export default globalErrorHandler;