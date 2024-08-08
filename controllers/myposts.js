const express = require("express");
express.Router({ mergeParams: true });
const router = express.Router();
const Volunteer = require("../models/volunteer");
async function myposts(req, res) {
  const { email } = req.decoded;
  const myPost = await Volunteer.find({ org_email: email });
  res.send({ message: myPost });
}
async function mypostsID(req, res) {
  const { id } = req.params;
  const foundItem = await Volunteer.findById(id);
  res.send({ message: foundItem });
}
async function mypostsIDPUT(req, res) {
  const { id } = req.params;
  await Volunteer.findByIdAndUpdate(id, req.body, { new: true });
  res.send({ message: "Successfully Updated" });
}
async function mypostsIDDELETE(req, res) {
  const { id } = req.params;
  await Volunteer.findByIdAndDelete(id);
  res.send({ message: "Successfully deleted the post" });
}
router.route("/").get(myposts);
router
  .route("/:id")
  .get(mypostsID)
  .put(mypostsIDPUT)
  .delete(mypostsIDDELETE);

module.exports = router;
