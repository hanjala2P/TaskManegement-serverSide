import prisma from "../../utlis/prisma";
import bcrypt from "bcrypt";
import config from "../../config";
import { createToken } from "../../utlis/jwt";
import AppError from "../../middleware/AppError";

// 1. Register User Service
const registerUserIntoDB = async (payload: any) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(400, "User already exists with this email!");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  // Exclude password from the returned object
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

// 2. Login User Service
const loginUserFromDB = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(404, "User does not exist!");
  }

  // Check if password matches
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Password is incorrect!");
  }

  // Create JWT Payload
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  // Generate Token
  const accessToken = createToken(
    jwtPayload,
    config.jwt.secret,
    config.jwt.expiresIn
  );

  const { password, ...userWithoutPassword } = user;

  return {
    accessToken,
    user: userWithoutPassword,
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUserFromDB,
};