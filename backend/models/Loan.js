const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  loanType: String,
  name: String,
  email : String,
  contactNumber: String,
  loanAmount: Number,
  loanDuration: Number,
  idProof: {
    data: Buffer,
    contentType: String,
  },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  repaymentDate: Date,

});

module.exports = mongoose.model("Loan", LoanSchema);
