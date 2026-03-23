import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sql } from "../config/db.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user in the database
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user) return res.status(401).json({ message: "Invalid Email" });

    // 2. Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    // 3. Create the "Ticket" (JWT)
    // We put the user's ID inside the ticket so we know who they are later
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" } // Ticket expires in 1 day
    );

    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



