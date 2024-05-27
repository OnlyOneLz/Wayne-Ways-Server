const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: date,
    required: true,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
