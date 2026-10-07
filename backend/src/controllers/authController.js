import User from "../models/user.js";
import bcrypt from "bcryptjs"; // for hashing passwords
import jwt from "jsonwebtoken"; // for token auth

// Signup
export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body; // Get user input

  try {
    if (password !== confirmPassword) {
      console.log("Password dose'nt match");
      return res.status(400).json({ message: "Password dosen't match" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username: username,
    });

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const user = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res
      .status(201)
      .json({ success: true, token, message: "User created", user });
  } catch (err) {
    console.log("this is the catch error block in authController");
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");;
    if (!user) {
      console.log("is the error inside the user?")
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage || "",
    };

    return res.status(200).json({
      success: true,
      token,
      user: safeUser,
      message: "Login successful",
    });

  } catch (err) {
    console.error("Login error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// Get Logged-In User Profile
export const getUserProfile = async (req, res) => {
  try {
    // req.user me user ka id hota hai (middleware ne set kiya hua)
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Flow of authController in project

// Signup: frontend → route → controller → User model → DB → response

// Login: frontend → route → controller → User model → JWT generate → response

// Get Profile: frontend → route → authMiddleware → controller → User model → response
