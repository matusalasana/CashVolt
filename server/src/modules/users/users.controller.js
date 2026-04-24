import {
  getUsersService,
  updateUserService,
  deleteUserService,
  changePasswordService
} from "./users.service.js";

export const getUsers = async (req, res) => {
  try {
    const result = await getUsersService();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const result = await updateUserService(req.body, user_id);
    res.status(200).json(result);
  } catch (err) {
    const statusCode = err.message.includes("not found") ? 404 : 
                      err.message.includes("valid") ? 400 : 500;
    res.status(statusCode).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.id; // Use param for admin to delete any user
    const result = await deleteUserService(user_id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    const statusCode = err.message.includes("not found") ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old password and new password are required" });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }
    
    await changePasswordService(user_id, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    const statusCode = err.message.includes("incorrect") ? 401 : 
                      err.message.includes("not found") ? 404 : 400;
    res.status(statusCode).json({ message: err.message });
  }
};