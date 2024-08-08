const express = require("express");
express.Router({ mergeParams: true });
const router = express.Router();
const Volunteer = require("../models/volunteer");
const BeAVolunteer = require("../models/beAVolunteer");
async function be_a_volunteer(req, res) {
  const { id } = req.params;
  const foundItem = await Volunteer.findById(id);
  res.send({ message: foundItem });
}

async function be_a_volunteerPOST(req, res) {
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
}

router.route("/:id").get(be_a_volunteer).post(be_a_volunteerPOST);

module.exports = router;
