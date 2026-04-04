import {
  registerUser,
  loginUser,
  getUserProfile
} from "./auth.service.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);

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
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  res.json({ message: "Logged out successfully" });
};

// GET ME
export const getMe = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.userId);

    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};