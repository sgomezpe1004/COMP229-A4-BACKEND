import { connectToDatabase } from "./db.js";
import Project from "../models/project.model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case "GET":
        if (id) {
          const project = await Project.findById(id);
          if (!project) return res.status(404).json({ error: "Project not found" });
          return res.status(200).json(project);
        }
        const projects = await Project.find();
        return res.status(200).json(projects);

      case "POST":
        const newProject = new Project(req.body);
        await newProject.save();
        return res.status(201).json({ message: "Project created", project: newProject });

      case "PUT":
        if (!id) return res.status(400).json({ error: "ID is required" });
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ error: "Project not found" });
        return res.status(200).json({ message: "Project updated", project: updatedProject });

      case "DELETE":
        if (!id) return res.status(400).json({ error: "ID is required" });
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return res.status(404).json({ error: "Project not found" });
        return res.status(200).json({ message: "Project deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
