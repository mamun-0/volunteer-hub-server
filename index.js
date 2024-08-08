require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { verifyToken } = require("./middleware/middleware");
const MyPostsRouter = require("./controllers/myposts");
const RequestVolunteerRouter = require("./controllers/requestVolunteer");
const BeAVolunteerRouter = require("./controllers/beAVolunteer");
const NeedVolunteerRouter = require("./controllers/needVolunteer");
// Controllers
const {
  jwtPOST,
  need_volunteer_6,
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
app.use("/myposts", verifyToken, MyPostsRouter);
app.use("/request-voluenteer", verifyToken, RequestVolunteerRouter);
app.use("/be-a-volunteer", verifyToken, BeAVolunteerRouter);
app.use("/need-volunteer", verifyToken, NeedVolunteerRouter);

app.post("/jwt", jwtPOST);
app.get("/need-volunteer-6", need_volunteer_6);
app.post("/add-volunteer", verifyToken, add_volunteerPOST);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
