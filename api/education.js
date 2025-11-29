import { connectToDatabase } from "./db.js";
import Qualification from "../models/education.model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const qualifications = await Qualification.find();
      return res.status(200).json(qualifications);
    }

    if (req.method === "POST") {
      const qualification = new Qualification(req.body);
      await qualification.save();
      return res.status(201).json({ message: "Qualification created", qualification });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
