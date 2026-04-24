import {
  getUsersRepo,
  getUserByIdRepo,
  updateUserRepo,
  deleteUserRepo,
  updatePasswordRepo
} from "./users.repository.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// GET ALL
export const getUsersService = async () => {
  return await getUsersRepo();
};

// UPDATE
export const updateUserService = async (data, user_id) => {
  // Only allow safe fields
  const allowedUpdates = ['first_name', 'last_name', 'email', 'profile_picture'];
  const updates = {};
  
  for (const field of allowedUpdates) {
    if (data[field] !== undefined) {
      // Trim and validate strings
      if (typeof data[field] === 'string') {
        const trimmedValue = data[field].trim();
        if (trimmedValue === '') {
          throw new Error(`${field} cannot be empty`);
        }
        updates[field] = trimmedValue;
      } else {
        updates[field] = data[field];
      }
    }
  }
  
  if (Object.keys(updates).length === 0) {
    throw new Error("No valid fields to update");
  }
  
  // Validate email format
  if (updates.email && !isValidEmail(updates.email)) {
    throw new Error("Invalid email format");
  }
  
  // Check if user exists
  const existingUser = await getUserByIdRepo(user_id);
  if (!existingUser) {
    throw new Error("User not found");
  }
  
  // Check if email is taken by another user
  if (updates.email && updates.email !== existingUser.email) {
    const emailCheck = await sql`
      SELECT id FROM users WHERE email = ${updates.email} AND id != ${user_id}
    `;
    if (emailCheck.length > 0) {
      throw new Error("Email already in use");
    }
  }
  
  const result = await updateUserRepo(updates, user_id);
  if (!result) {
    throw new Error("User not found or update failed");
  }
  
  return result;
};

// CHANGE PASSWORD
export const changePasswordService = async (user_id, oldPassword, newPassword) => {
  // Get user with password
  const user = await getUserByIdRepo(user_id);
  if (!user) {
    throw new Error("User not found");
  }
  
  // Verify old password
  const isValid = await comparePassword(oldPassword, user.password);
  if (!isValid) {
    throw new Error("Current password is incorrect");
  }
  
  // Hash new password
  const hashedPassword = await hashPassword(newPassword);
  
  // Update password
  const result = await updatePasswordRepo(user_id, hashedPassword);
  if (!result) {
    throw new Error("Failed to update password");
  }
  
  return true;
};

// DELETE
export const deleteUserService = async (user_id) => {
  // Check if user exists
  const existingUser = await getUserByIdRepo(user_id);
  if (!existingUser) {
    throw new Error("User not found");
  }
  
  // Optional: Check if user has important data before deletion
  // const hasTransactions = await checkUserTransactionsRepo(user_id);
  // if (hasTransactions) {
  //   throw new Error("Cannot delete user with existing transactions");
  // }
  
  const result = await deleteUserRepo(user_id);
  if (!result) {
    throw new Error("Failed to delete user");
  }
  
  return true;
};