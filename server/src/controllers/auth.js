import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password (VERY important)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user into DB
    const newUser = await sql`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword})
      RETURNING id, first_name, last_name, email
    `;

    res.status(201).json({
      message: "User created successfully",
      user: newUser[0],
    });

  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async ( req, res ) => {
  try {
    const { email, password } = req.body;
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    const user = users[0]
    if(!user){
      return res.status(400).json({message: "user not found"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid){
      return res.status(400).json({message: "Invalid credentials"})
    }
    // Create token 
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
