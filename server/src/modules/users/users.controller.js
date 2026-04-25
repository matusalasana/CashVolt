import {
  getUsersService,
  updateUserService,
  deleteUserService,
  changePasswordService
} from "./users.service.js";


// GET USERS (admin)
export const getUsers = async (req, res) => {
  try {
    const result = await getUsersService();

    return res.status(200).json(result);

  } catch (err) {
    console.error("Error fetching users:", err);

    return res.status(500).json({
      message: "Error fetching users"
    });
  }
};


// UPDATE USER (self)
export const updateUser = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const result = await updateUserService(req.body, user_id);

    return res.status(200).json(result);

  } catch (err) {
    console.log("Update user error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.id;

    const result = await deleteUserService(user_id);

    return res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (err) {
    console.log("Delete user error:", err.message);

    const statusCode =
      err.message.includes("not found") ? 404 : 500;

    return res.status(statusCode).json({
      message: err.message
    });
  }
};


// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    // validation errors → 400
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old password and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters"
      });
    }

    await changePasswordService(user_id, oldPassword, newPassword);

    return res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (err) {
    console.log("Change password error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};