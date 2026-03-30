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


// controllers/auth.js
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const foundUser = user[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. CREATE TOKEN
    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. SEND TOKEN - FIXED: Added proper object syntax with commas
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    res.json({
      message: "Login successful",
      user: {
        id: foundUser.id,
        email: foundUser.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });

  res.json({
    message: "Logged out successfully"
  });
};


export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // Fetch full user data from database
    const user = await sql`
      SELECT id, first_name, last_name, email, role
      FROM users 
      WHERE id = ${req.user.userId}
    `;
    
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user[0]);
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};