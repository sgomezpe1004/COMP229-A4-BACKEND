// api/index.js
import express from "express";
import connectDB from "../db.js"; // singleton para MongoDB

// Importa tus rutas
import userRoutes from "../user.routes.js";
import authRoutes from "../auth.routes.js";
import contactRoutes from "../contact.routes.js";
import projectRoutes from "../project.routes.js";
import educationRoutes from "../education.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Conexión a MongoDB
await connectDB();

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

export default app;
