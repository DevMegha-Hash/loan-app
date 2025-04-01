const express = require("express");
const multer = require("multer");
const User = require("../models/user");




const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload-profile", upload.single("profilePic"), async (req, res) => {
  try {
    const userId = req.user.id; 
    const profilePicPath = `http://localhost:5000/uploads/${req.file.filename}`;

    await User.findByIdAndUpdate(userId, { profilePic: profilePicPath });

    res.json({ profilePic: profilePicPath });
  } catch (error) {
    res.status(500).json({ message: "Profile picture upload failed" });
  }
});

router.post("/remove-profile", async (req, res) => {
    try {
      const userId = req.user.id;
      const defaultAvatar = "https://via.placeholder.com/100";
  
      await User.findByIdAndUpdate(userId, { profilePic: defaultAvatar });
  
      res.json({ message: "Profile picture removed" });
    } catch (error) {
      res.status(500).json({ message: "Profile picture removal failed" });
    }
  });
  


// Get credit score (Mock Data)
router.get("/credit-score", async (req, res) => {
  const { email } = req.query;
  res.json({ score: Math.floor(Math.random() * 300) + 500 }); // Random credit score
});


router.get("/profile", async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data" });
    }
  });
  
  router.put("/update-profile", async (req, res) => {
    try {
      const { name } = req.body;
      await User.findByIdAndUpdate(req.user.id, { name });
      res.json({ message: "Profile updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  
  router.put("/change-password", async (req, res) => {
    try {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });
      res.json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to change password" });
    }
  });
  

module.exports = router;
