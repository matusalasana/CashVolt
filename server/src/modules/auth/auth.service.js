import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  findUserByEmail,
  createUser,
  findUserById
} from "./auth.repository.js";

dotenv.config();

// REGISTER
export const registerUser = async (data) => {
  const { first_name, last_name, email, password } = data;

  // check existing user
  const existing = await findUserByEmail(email);

  if (existing.length > 0) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user
  const user = await createUser({
    first_name,
    last_name,
    email,
    password: hashedPassword
  });

  return user[0];
};

// LOGIN
export const loginUser = async (data) => {
  const { email, password } = data;

  const result = await findUserByEmail(email);

  if (result.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};

// UserInfo
export const getUserProfile = async (userId) => {
  const result = await findUserById(userId);

  if (result.length === 0) {
    throw new Error("User not found");
  }

  return result[0];
};