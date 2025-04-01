const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const Loan = require("../models/Loan");
const {authMiddleware} = require("../middleware/authmiddleware"); // Ensure it's a function

const router = express.Router();
require("dotenv").config();

// Multer Storage for ID Proof Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Loan Application Route
router.post("/", upload.single("idProof"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "ID Proof is required" });
    }

    const newLoan = new Loan({
      userId: req.user.userId,
      loanType: req.body.loanType,
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      loanAmount: req.body.loanAmount,
      loanDuration: req.body.loanDuration,
      idProof: { data: req.file.buffer, contentNumber: req.file.mimetype },
      userId: req.user ? req.user.userId : null,
    });

    await newLoan.save();

    // Send Email to Admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Loan Application Submitted",
      text: `A new ${req.body.loanType} application has been submitted.\n\n Name: ${req.body.name}\n Contact: ${req.body.contactNumber}\n Email: ${req.body.email}\n Amount: $${req.body.loanAmount}\n Duration: ${req.body.loanDuration} months\n\n Please review the application.`,
    };

    transporter.sendMail(adminMailOptions, (error) => {
      if (error) console.error("Error sending email to Admin:", error);
    });

    // Send Email to User
    if (req.body.email) {
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Loan Application Received",
        text: `Hello ${req.body.name},\n\nWe have received your ${req.body.loanType} application.\n\nDetails:\nLoan Amount: $${req.body.loanAmount}\nDuration: ${req.body.loanDuration} months\n\nOur team will review your application and get back to you soon.\n\nThank you for choosing us!`,
      };

      transporter.sendMail(userMailOptions, (error) => {
        if (error) console.error("Error sending email to User:", error);
      });
    }

    res.status(201).json({ message: "Loan Application Submitted and Email Sent!" });
  } catch (error) {
    console.error("Error submitting loan application:", error);
    res.status(500).json({ error: "Error submitting loan application" });
  }
});

// ✅ Fixed Get User Loans Route
router.get("/", authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.userId });
    res.json(loans);
  } catch (err) {
    console.error("Error fetching user loans:", err);
    res.status(500).json({ error: "Error fetching user loans" });
  }
});

module.exports = router;

