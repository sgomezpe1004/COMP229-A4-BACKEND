import { connectToDatabase } from "./db.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req, res) {
  await connectToDatabase();
  const { method } = req;
  const { action } = req.query;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!action) {
    return res.status(400).json({ error: "Action missing or invalid" });
  }

  try {
    if (action === "signup") {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      return res.status(201).json({ message: "User created", token, user });
    }

    if (action === "signin") {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !user.authenticate(password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      return res.status(200).json({ message: "Signed in", token, user });
    }

    return res.status(400).json({ error: "Action missing or invalid" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
