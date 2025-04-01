const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  phone: { type: String, unique: true, required: true },
  profilePicture : { type: String },
  creditScore: { type: Number, default: 700 },
});

module.exports = mongoose.model("User", UserSchema);


// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["user", "admin"], default: "user" }
// });

// module.exports = mongoose.model("User", UserSchema);
