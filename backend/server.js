require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { authMiddleware, adminMiddleware } = require("./middleware/authmiddleware");

const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const otpRoutes = require("./routes/otpRoutes");
const paymentReminderRoutes = require("./routes/paymentReminder");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Database Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/users",userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/payment-reminder", paymentReminderRoutes);

app.get("/", (req, res) => {
  res.send("Finance Loan Management System Backend is Running...");
});

app.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

require("./scheduledJobs");
