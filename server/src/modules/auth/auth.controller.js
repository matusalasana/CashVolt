import {
  registerUserService,
  loginUserService,
  updateUserService,
  getMeService
} from "./auth.service.js";
import { NODE_ENV } from "../../config/env.js"

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

    return res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    console.log("Error registering user:", error);

    return res.status(400).json({
      message: error.message
    });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { user, token } = await loginUserService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production" ? true : false,
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Login error:", error.message);

    return res.status(401).json({
      message: error.message
    });
  }
};


// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const result = await updateUserService(req.body, req.user.userId);

    return res.status(200).json(result);

  } catch (error) {
    console.log("Update error:", error.message);

    return res.status(400).json({
      message: error.message || "Failed to update user"
    });
  }
};


// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: NODE_ENV === "production" ? true : false,
    sameSite: NODE_ENV === "production" ? "none" : "lax",
    path: "/"
  });

  return res.status(200).json({
    message: "Logged out successfully"
  });
};


// GET ME / CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log("GetMe error:", error.message);

    return res.status(500).json({
      message: error.message
    });
  }
};