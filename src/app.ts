import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import router from "./routes/routes"; 
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";

const app: Application = express();

// 1. Security Helmet Middleware
app.use(helmet());

// 2. CORS Configuration 
app.use(
  cors({
    origin: ["http://localhost:3000", "https://task-mangement-theta.vercel.app", 'https://task-mangement-jvpd0ncty-disentra.vercel.app' ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, 
  })
);

// 3. Parsers
app.use(express.json());
app.use(cookieParser());

// 4. Rate Limiting (DDoS / Brute-force protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});


app.use("/api", limiter);

// 5. Application Routes
app.use("/api/v1", router);

// 6. Basic Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Task Management API is running successfully with Prisma! 🚀",
  });
});

// 7. Error Handlers
app.use(notFound);
app.use(globalErrorHandler);

export default app;