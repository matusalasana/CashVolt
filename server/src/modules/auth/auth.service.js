import { JWT_SECRET } from "../../config/env.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";

import {
  findUserByEmailRepo,
  registerUserRepo,
  findUserByIdRepo
} from "./auth.repository.js";

// REGISTER
export const registerUserService = async (data) => {
  const { first_name, last_name, email, password } = data;
  
  if(!first_name || !last_name || !email || !password){
    throw new Error("Missing required fields")
  }
  const existing = await findUserByEmailRepo(email);
  if (existing) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);
  
  const user = await registerUserRepo({
    first_name,
    last_name,
    email,
    password: hashedPassword
  });

  return user;
};

// LOGIN
export const loginUserService = async (data) => {
  const { email, password } = data;
  
  if (!email || !password) {
    throw new Error("Missing required fields");
  }
  
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  const user = await findUserByEmailRepo(email.toLowerCase().trim());
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  
  const token = signToken({ userId: user.id, role: user.role });
  return { user, token };
};

// UserInfo
export const getMeService = async (userId) => {
  const user = await findUserByIdRepo(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};