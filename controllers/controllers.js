// Mongoose Models
const Volunteer = require("../models/volunteer");
const BeAVolunteer = require("../models/beAVolunteer");
const jwt = require("jsonwebtoken");
module.exports.logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    })
    .send({ success: true });
};

module.exports.jwtPOST = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRECT, {
    expiresIn: "7d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send({ success: true });
};

module.exports.myposts = async (req, res) => {
  const {
    user: { email },
  } = req;
  const myPost = await Volunteer.find({ org_email: email });
  res.send({ message: myPost });
};

module.exports.mypostsID = async (req, res) => {
  const { id } = req.params;
  const foundItem = await Volunteer.findById(id);
  res.send({ message: foundItem });
};
module.exports.mypostsIDPUT = async (req, res) => {
  const { id } = req.params;
  await Volunteer.findByIdAndUpdate(id, req.body, { new: true });
  res.send({ message: "Successfully Updated" });
};
module.exports.mypostsIDDELETE = async (req, res) => {
  const { id } = req.params;
  await Volunteer.findByIdAndDelete(id);
  res.send({ message: "Successfully deleted the post" });
};

module.exports.request_voluenteer = async (req, res) => {
  const {
    user: { email },
  } = req;
  const requestedVolunteer = await BeAVolunteer.find({
    volunteer_email: email,
  });
  res.send({ message: requestedVolunteer });
};
module.exports.request_voluenteerDELETE = async (req, res) => {
  const { id } = req.params;
  await BeAVolunteer.findByIdAndDelete(id);
  res.send({ message: "Successfully Cancel volunteer request" });
};
module.exports.be_a_volunteer = async (req, res) => {
  const { id } = req.params;
  const foundItem = await Volunteer.findById(id);
  res.send({ message: foundItem });
};
module.exports.be_a_volunteerPOST = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedItem = await Volunteer.findByIdAndUpdate(
    id,
    { $inc: { num_volunteer: -1 } },
    { new: true }
  );
  await new BeAVolunteer({
    ...data,
    num_volunteer: updatedItem.num_volunteer,
  }).save();
  res.send({ message: "Successfully requested to be a volunteer" });
};
module.exports.need_volunteer_6 = async (req, res) => {
  const filteredVolunteer = await Volunteer.find().sort({ date: -1 }).limit(6);
  res.send({ message: filteredVolunteer });
};
module.exports.need_volunteer = async (req, res) => {
  const allVolunteer = await Volunteer.find({});
  return res.send({ message: allVolunteer });
};
module.exports.need_volunteerID = async (req, res) => {
  const { id } = req.params;
  const foundItem = await Volunteer.findById(id);
  res.send({ message: foundItem });
};
module.exports.add_volunteerPOST = async (req, res) => {
  await new Volunteer(req.body).save();
  return res.send({ message: "Successfully added🤪" });
};
