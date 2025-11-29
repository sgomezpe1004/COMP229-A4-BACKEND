import { connectToDatabase } from "./db.js";
import Contact from "../models/contact.model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const contacts = await Contact.find().select("firstname lastname email contactNumber");
      return res.status(200).json(contacts);
    }

    if (req.method === "POST") {
      const contact = new Contact(req.body);
      await contact.save();
      return res.status(201).json({ message: "Contact created", contact });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
