import { connectToDatabase } from "./db.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req, res) {
  await connectToDatabase();
  const { method } = req;
  const { action } = req.query;

  if (method === "POST") {
    if (action === "signup") {
      try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        return res.status(201).json({ message: "User created", token, user });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    } else if (action === "signin") {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.authenticate(password)) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        return res.status(200).json({ message: "Signed in", token, user });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    } else {
      return res.status(400).json({ error: "Action missing or invalid" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
