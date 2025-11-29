// api/index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compress from "compression";

import connectDB from "./db.js";

// Importa tus rutas
import userRoutes from "../user.routes.js";
import authRoutes from "../auth.routes.js";
import contactRoutes from "../contact.routes.js";
import projectRoutes from "../project.routes.js";
import educationRoutes from "../education.routes.js";

// Conecta a MongoDB antes de cualquier request
await connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
});

// **IMPORTANTE:** No usamos app.listen() en Vercel
export default app;
