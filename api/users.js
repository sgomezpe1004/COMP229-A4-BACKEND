import { connectToDatabase } from "./db.js";
import User from "../models/user.model.js";

export default async function handler(req, res) {
  await connectToDatabase();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        if (id) {
          const user = await User.findById(id).select("name email updated created");
          if (!user) return res.status(404).json({ error: "User not found" });
          return res.status(200).json(user);
        } else {
          const users = await User.find().select("name email updated created");
          return res.status(200).json(users);
        }
      } catch (err) {
        return res.status(500).json({ error: "Server error" });
      }

    case "POST":
      try {
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json({ message: "User created!", user: newUser });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

    case "PUT":
      try {
        if (!id) return res.status(400).json({ error: "ID is required" });
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        return res.status(200).json({ message: "User updated", user: updatedUser });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

    case "DELETE":
      try {
        if (!id) return res.status(400).json({ error: "ID is required" });
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        return res.status(200).json({ message: "User deleted" });
      } catch (err) {
        return res.status(500).json({ error: "Server error" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
