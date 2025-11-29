import { connectToDatabase } from "./db.js";
import Qualification from "../models/education.model.js";

export default async function handler(req, res) {
  await connectToDatabase();
  const { method } = req;
  const { id } = req.query;

  try {
    switch(method) {
      case "GET":
        if(id) {
          const qual = await Qualification.findById(id);
          if(!qual) return res.status(404).json({ error: "Qualification not found" });
          return res.status(200).json(qual);
        } else {
          const qualifications = await Qualification.find();
          return res.status(200).json(qualifications);
        }
      case "POST":
        const newQual = new Qualification(req.body);
        await newQual.save();
        return res.status(201).json({ message: "Qualification created", qualification: newQual });
      case "PUT":
        if(!id) return res.status(400).json({ error: "ID required" });
        const updatedQual = await Qualification.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedQual) return res.status(404).json({ error: "Qualification not found" });
        return res.status(200).json({ message: "Qualification updated", qualification: updatedQual });
      case "DELETE":
        if(!id) return res.status(400).json({ error: "ID required" });
        const deletedQual = await Qualification.findByIdAndDelete(id);
        if(!deletedQual) return res.status(404).json({ error: "Qualification not found" });
        return res.status(200).json({ message: "Qualification deleted" });
      default:
        res.setHeader("Allow", ["GET","POST","PUT","DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch(error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
