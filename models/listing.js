const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://unsplash.com/photos/a-waterfall-in-the-middle-of-a-lush-green-forest-J6Fdqeb0Vcs",
    set: (v) =>
      v === "" ? "https://unsplash.com/photos/a-waterfall-in-the-middle-of-a-lush-green-forest-J6Fdqeb0Vcs" : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"Review",
  }]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;