import { connectToDatabase } from "./db.js";
import Contact from "../models/contact.model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case "GET":
        if (id) {
          const contact = await Contact.findById(id);
          if (!contact) return res.status(404).json({ error: "Contact not found" });
          return res.status(200).json(contact);
        }
        const contacts = await Contact.find().select("firstname lastname email contactNumber");
        return res.status(200).json(contacts);

      case "POST":
        const newContact = new Contact(req.body);
        await newContact.save();
        return res.status(201).json({ message: "Contact created", contact: newContact });

      case "PUT":
        if (!id) return res.status(400).json({ error: "ID is required" });
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ error: "Contact not found" });
        return res.status(200).json({ message: "Contact updated", contact: updatedContact });

      case "DELETE":
        if (!id) return res.status(400).json({ error: "ID is required" });
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) return res.status(404).json({ error: "Contact not found" });
        return res.status(200).json({ message: "Contact deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
