const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  date: {
    type: Number,
    default: Date.now,
  },
  userData: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    // required: true,
  },
});

module.exports = mongoose.model("clients", userSchema);
