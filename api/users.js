import { connectToDatabase } from "./db.js";
import User from "../models/user.model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const users = await User.find().select("name email updated created");
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const user = new User(req.body);
      await user.save();
      return res.status(201).json({ message: "User created", user });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
