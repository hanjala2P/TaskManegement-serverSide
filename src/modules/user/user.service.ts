import prisma from "../../utlis/prisma"; 
import AppError from "../../middleware/AppError";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

// 1. Create User
const createUserIntoDB = async (payload: User) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(400, "This email is already registered!");
  }

  // পাসওয়ার্ড হ্যাশ করে সেভ করা ভালো প্র্যাকটিস
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  // পাসওয়ার্ড বাদে বাকি ডাটা রিটার্ন করা
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

// 2. Get All Users
const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      bio: true,
      dateOfBirth: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

// 3. Get Single User by ID
const getSingleUserFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      bio: true,
      dateOfBirth: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new AppError(404, "User not found with this ID!");
  }

  return result;
};

// 4. Update User
const updateUserInDB = async (id: string, payload: Partial<User>) => {
  const isExist = await prisma.user.findUnique({ where: { id } });
  if (!isExist) {
    throw new AppError(404, "User not found to update!");
  }

  // যদি পাসওয়ার্ড আপডেট করতে চায়, তবে তা হ্যাশ করে নিতে হবে
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const result = await prisma.user.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      bio: true,
      dateOfBirth: true,
      phone: true,
      updatedAt: true,
    },
  });
  return result;
};

// 5. Delete User
const deleteUserFromDB = async (id: string) => {
  const isExist = await prisma.user.findUnique({ where: { id } });
  if (!isExist) {
    throw new AppError(404, "User not found to delete!");
  }

  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};