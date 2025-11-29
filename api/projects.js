import { connectToDatabase } from "./db.js";
import Project from "../models/project.model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const projects = await Project.find();
      return res.status(200).json(projects);
    }

    if (req.method === "POST") {
      const project = new Project(req.body);
      await project.save();
      return res.status(201).json({ message: "Project created", project });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
