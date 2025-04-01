const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
const SECRET_KEY = "your_jwt_secret_key";

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role, phone } = req.body; // Role comes from request
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role, phone }); // Store role

    await user.save();
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();
    
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({success: true, token, role: user.role, user: { name: user.name, profilePic: user.profilePic } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// // Admin & User Login
// router.post("/login", async (req, res) => {
//   try {
//       const { email, password } = req.body;

//       // Find user in database
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ message: "User not found" });

//       // Check password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//       // Generate JWT Token
//       const token = jwt.sign(
//           { id: user._id,  role: user.role },
//           "SECRET_KEY",
//           { expiresIn: "1h" }
//       );

//       res.json({ message: "Login successful", token,  role: user.role });
//   } catch (error) {
//       res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
