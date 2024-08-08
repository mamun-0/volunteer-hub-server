const express = require("express");
express.Router({ mergeParams: true });
const router = express.Router();
const Volunteer = require("../models/volunteer");

async function need_volunteer(req, res) {
  const allVolunteer = await Volunteer.find({});
  return res.send({ message: allVolunteer });
}
async function need_volunteerID(req, res) {
  const { id } = req.params;
  const foundItem = await Volunteer.findById(id);
  res.send({ message: foundItem });
}

router.route("/").get(need_volunteer);
router.route("/:id").get(need_volunteerID);

module.exports = router;
