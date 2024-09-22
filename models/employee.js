const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email_address: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    start_date: { type: Date, required: true },
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
