// Mongoose Models
const Volunteer = require("../models/volunteer");
const jwt = require("jsonwebtoken");

module.exports.jwtPOST = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRECT, {
    expiresIn: "7d",
  });
  res.send({ token });
};

module.exports.need_volunteer_6 = async (req, res) => {
  const filteredVolunteer = await Volunteer.find().sort({ date: -1 }).limit(6);
  res.send({ message: filteredVolunteer });
};

module.exports.add_volunteerPOST = async (req, res) => {
  await new Volunteer(req.body).save();
  return res.send({ message: "Successfully added🤪" });
};
