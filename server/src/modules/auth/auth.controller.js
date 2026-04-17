import {
  registerUserService,
  loginUserService,
  getMeService
} from "./auth.service.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { user, token } = await loginUserService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/"
  });

  res.json({ message: "Logged out successfully" });
};

// GET ME/USER
export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};