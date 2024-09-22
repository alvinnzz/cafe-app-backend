const mongoose = require("mongoose");
const { Schema } = mongoose;

const CafeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cafe", CafeSchema);
