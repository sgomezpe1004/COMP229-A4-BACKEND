// api/auth.js
import { connectToDatabase } from './db.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { action } = req.query;

    if (action === 'signup') {
      try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        return res.status(201).json({ message: 'User created', token, user });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    }

    if (action === 'signin') {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.authenticate(password)) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        return res.status(200).json({ message: 'Signed in', token, user });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    }

    if (action === 'signout') {
      // No manejamos cookies serverless, solo devolvemos mensaje
      return res.status(200).json({ message: 'Signed out' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
