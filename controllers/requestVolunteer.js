const express = require("express");
express.Router({ mergeParams: true });
const router = express.Router();
const BeAVolunteer = require("../models/beAVolunteer");
async function request_voluenteer(req, res) {
  const { email } = req.decoded;
  const requestedVolunteer = await BeAVolunteer.find({
    volunteer_email: email,
  });
  res.send({ message: requestedVolunteer });
}

async function request_voluenteerDELETE(req, res) {
  const { id } = req.params;
  await BeAVolunteer.findByIdAndDelete(id);
  res.send({ message: "Successfully Cancel volunteer request" });
}

router.route("/").get(request_voluenteer);
router.route("/:id").delete(request_voluenteerDELETE);

module.exports = router;
