const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = { authMiddleware, adminMiddleware };
