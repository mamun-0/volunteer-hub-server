const mongoose = require("mongoose");

const BeAVolunteerSchema = new mongoose.Schema({
  post_title: String,
  thumbnail_url: String,
  description: String,
  category: String,
  location: String,
  num_volunteer: Number,
  date: Date,
  org_name: String,
  org_email: String,
  status: String,
  volunteer_suggestion: String,
  volunteer_email: String,
  volunteer_name: String,
});

module.exports = mongoose.model("beAVolunteer", BeAVolunteerSchema);
