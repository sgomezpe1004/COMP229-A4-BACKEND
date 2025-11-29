import { connectToDatabase } from "./db.js";
import Qualification from "../models/education.model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case "GET":
        if (id) {
          const qualification = await Qualification.findById(id);
          if (!qualification) return res.status(404).json({ error: "Qualification not found" });
          return res.status(200).json(qualification);
        }
        const qualifications = await Qualification.find();
        return res.status(200).json(qualifications);

      case "POST":
        const newQualification = new Qualification(req.body);
        await newQualification.save();
        return res.status(201).json({ message: "Qualification created", qualification: newQualification });

      case "PUT":
        if (!id) return res.status(400).json({ error: "ID is required" });
        const updatedQualification = await Qualification.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedQualification) return res.status(404).json({ error: "Qualification not found" });
        return res.status(200).json({ message: "Qualification updated", qualification: updatedQualification });

      case "DELETE":
        if (!id) return res.status(400).json({ error: "ID is required" });
        const deletedQualification = await Qualification.findByIdAndDelete(id);
        if (!deletedQualification) return res.status(404).json({ error: "Qualification not found" });
        return res.status(200).json({ message: "Qualification deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
