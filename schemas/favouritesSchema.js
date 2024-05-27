const mongoose = require("mongoose");

const favouritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Favourites = mongoose.model("Favourite", favouritesSchema);

module.exports = Favourites;
