const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  excercises: {
    type: Array,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  pk: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("users", postSchema);
