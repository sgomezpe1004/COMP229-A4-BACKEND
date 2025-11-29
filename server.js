import express from "express";
import mongoose from "mongoose";

const app = express();

// Variables de entorno
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3005;

mongoose.Promise = global.Promise;

// Conexión a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error(`Unable to connect to database: ${MONGO_URI}`, err);
  });

// Manejo de errores de conexión
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio Application" });
});

// Iniciar servidor
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server started on port ${PORT}.`);
  console.info(`Server URL: http://localhost:${PORT}`);
});

export default app;
