require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const Volunteer = require("./models/volunteer");
const { verifyToken } = require("./middleware/middleware");
// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/volunteer")
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log("Error happened : ", err);
  });

//   Routes
app.get("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    })
    .send({ success: true });
});
app.post("/jwt", async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRECT, {
    expiresIn: "365d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
});
app.get("/need-volunteer-6", async (req, res) => {
  const filteredVolunteer = await Volunteer.find().sort({ date: -1 }).limit(6);
  res.send({ message: filteredVolunteer });
});
app.get("/need-volunteer", verifyToken, async (req, res) => {
  const allVolunteer = await Volunteer.find({});
  return res.send({ message: allVolunteer });
});
app.get("/need-volunteer/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const foundItem = await Volunteer.findById(id);
  res.send({ message: foundItem });
});
app.post("/add-volunteer", verifyToken, async (req, res) => {
  await new Volunteer(req.body).save();
  return res.send({ message: "Successfully added🤪" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
