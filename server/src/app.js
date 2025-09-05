import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/user.routes.js";
import categoyRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/users.routes.js";
import orderRoutes from "./routes/order.routes.js";
import resetPassword from "./routes/resetPassword.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

connectDB();

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRoutes);
app.use("/api/category", categoyRoutes);
app.use("/api/product", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api", resetPassword);

app.get("/api/health", (req, res) => res.status(200).json({ status: "OK" }));

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.use(errorHandler);

export default app;
