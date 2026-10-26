import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  ip: process.env.IP || "0.0.0.0",
  node_env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};