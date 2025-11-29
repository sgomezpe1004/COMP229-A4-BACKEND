// server.js
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

// Import routes
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import contactRoutes from "./contact.routes.js";
import projectRoutes from "./project.routes.js";
import educationRoutes from "./education.routes.js";

// Config
import config from "./config.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Replace with your frontend URL if needed
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
});

// Start server
const PORT = config.port || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
