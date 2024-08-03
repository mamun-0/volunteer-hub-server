require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { verifyToken } = require("./middleware/middleware");

// Controllers
const {
  jwtPOST,
  myposts,
  mypostsID,
  mypostsIDPUT,
  mypostsIDDELETE,
  request_voluenteer,
  request_voluenteerDELETE,
  be_a_volunteer,
  be_a_volunteerPOST,
  need_volunteer_6,
  need_volunteer,
  need_volunteerID,
  add_volunteerPOST,
} = require("./controllers/controllers");
// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://ourvolunteer-b4aee.web.app",
      "https://ourvolunteer-b4aee.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log("Error happened : ", err);
  });

//   Routes
// app.get("/logout", logout);
app.post("/jwt", jwtPOST);
app.get("/myposts", verifyToken, myposts);
app.get("/myposts/:id", verifyToken, mypostsID);
app.put("/myposts/:id", verifyToken, mypostsIDPUT);
app.delete("/myposts/:id", verifyToken, mypostsIDDELETE);
app.get("/request-voluenteer", verifyToken, request_voluenteer);
app.delete("/request-voluenteer/:id", verifyToken, request_voluenteerDELETE);
app.get("/be-a-volunteer/:id", verifyToken, be_a_volunteer);
app.post("/be-a-volunteer/:id", verifyToken, be_a_volunteerPOST);
app.get("/need-volunteer-6", need_volunteer_6);
app.get("/need-volunteer", verifyToken, need_volunteer);
app.get("/need-volunteer/:id", verifyToken, need_volunteerID);
app.post("/add-volunteer", verifyToken, add_volunteerPOST);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
