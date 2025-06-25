const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");
const admin = require("../firebase-admin-init");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_SIGN;

// Route endpoint: 1
// To register new users ('/api/auth/register')
router.post(
  "/register",
  [
    body("name", "Name must be atleast 3 characters long").isLength({ min: 3 }),
    body("username", "Username must be atleast 4 characters long")
      .isLength({
        min: 4,
      })
      .matches(/^[a-zA-Z0-9_-]+$/),
    body("email", "Enter a valid Email address").isEmail(),
    body("password", "Password must be atleast 6 characters long.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const { name, username, email, password } = req.body;

      let existingUser = await User.findOne({ email });

      // If user already exsists with same email or username, send status "400" & error message
      if (existingUser) {
        if (existingUser.email === email) {
          return res
            .status(400)
            .json({ success, error: "Email is already registered" });
        }
        if (existingUser.username === username) {
          return res
            .status(400)
            .json({ success, error: "Username is already taken" });
        }
      }

      // Adding salt & hashing in user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a user
      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
      });

      // Create a "data" object using user id
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Create a Authentication token from that data & give it secret key/signature
      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true;
      // Send that Authentication Token
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong :( (Internal Server Error)",
        error: error.message,
      });
    }
  }
);

// Route endpoint: 2
// To login user with credentials ('/api/auth/login')
router.post(
  "/login",
  [
    body("email", "Enter a valid Email address").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Find the user by it's email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error:
            "Email or Password incoorect. Please login with correct credentials.",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res
          .status(403)
          .json({ success: false, message: "Invalid email or password" });

      // Send the payload data to that user
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET);
      res.json({
        success: true,
        authtoken: token,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong :( (Internal Server Error)",
        error: error.message,
      });
    }
  }
);

// Route endpoint: 3
// To login/register OAuth users (Google, GitHub) (/api/auth/firebase-login)
router.post("/firebase-login", async (req, res) => {
  try {
    const { token, githubUsername } = req.body;

    // 1. Verify token from Firebase
    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email, name, picture, firebase } = decoded;
    const provider = firebase?.sign_in_provider || "unknown";

    if (!email) {
      return res.status(400).json({
        success: false,
        error:
          "No email returned from GitHub. Make sure your GitHub email is public or verified.",
      });
    }

    let displayName = name || email?.split("@")[0];
    if (provider === "github.com" && githubUsername) {
      displayName = githubUsername;
    }

    // 2. Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: displayName,
        email,
        firebaseUid: uid,
        provider,
        password: "", // optional: Firebase users don’t need password
        username: email.split("@")[0] + "_" + Math.floor(Math.random() * 10000), // generate username
        avatar: picture,
      });
    }

    // 3. Issue JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(payload, JWT_SECRET);

    res.json({
      success: true,
      authtoken: authToken,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Firebase login error:", error);
    res.status(401).json({ success: false, error: "Invalid Firebase token" });
  }
});

// Route endpoint: 4
// To get all users detail ('/api/auth/getusers')
router.get("/getusers", authenticateToken, async (req, res) => {
  try {
    let success = true;
    // Select all users and unselect the "password" from it & send the response.
    const users = await User.find().select("-password");
    res.json({ success, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
