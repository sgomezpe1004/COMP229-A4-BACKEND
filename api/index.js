import express from "express";
import connectDB from "./db.js";

// Importa tus rutas
import userRoutes from "../user.routes.js";
import authRoutes from "../auth.routes.js";
// etc.

const app = express();
app.use(express.json());

// Conecta a MongoDB
await connectDB();

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// etc.

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

export default app;
