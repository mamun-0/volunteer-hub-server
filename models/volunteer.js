const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  post_title: String,
  thumbnail_url: String,
  description: String,
  category: String,
  location: String,
  num_volunteer: Number,
  date: Date,
  org_name: String,
  org_email: String,
});
module.exports = mongoose.model("volunteer", VolunteerSchema);
