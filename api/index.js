// api/index.js
import express from "express";
import connectDB from "./db.js";

// Importa tus rutas
import userRoutes from "../user.routes.js";
import authRoutes from "../auth.routes.js";
import contactRoutes from "../contact.routes.js";
import projectRoutes from "../project.routes.js";
import educationRoutes from "../education.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Top-level async function para conectar DB antes de usar rutas
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }

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

  return app;
};

// Exporta el app ya inicializado
export default await startServer();
