import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";

import {
  findUserByEmail,
  createUser,
  findUserById
} from "./auth.repository.js";

// REGISTER
export const registerUser = async (data) => {
  const { first_name, last_name, email, password } = data;

  // check existing user
  const existing = await findUserByEmail(email);

  if (existing.length > 0) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await hashPassword(password);

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

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = await signToken({ userId: user.id, role: user.role });
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