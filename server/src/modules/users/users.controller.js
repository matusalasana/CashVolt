import {
  getUsersService,
  updateUserService,
  deleteUserService,
  changePasswordService
} from "./users.service.js";

export const getUsers = async (req, res) => {
  try {
    const result = await getUsersService();
    res.json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.json({ message: "Error fetching users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const result = await updateUserService(req.body, user_id);
    res.json(result);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.id; // Use param for admin to delete any user
    const result = await deleteUserService(user_id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    const statusCode = err.message.includes("not found") ? 404 : 500;
    res.json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return res.json({ message: "Old password and new password are required" });
    }
    
    if (newPassword.length < 6) {
      return res.json({ message: "New password must be at least 6 characters" });
    }
    
    await changePasswordService(user_id, oldPassword, newPassword);
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
};