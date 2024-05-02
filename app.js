const createError = require("http-errors");
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//userRouters
const userRouter = require("./routes/userServiceRoute/userRouters");
const accessPermissionRouter = require("./routes/userServiceRoute/accessPermissionRouters");
const userAccessPermissionRouter = require("./routes/userServiceRoute/UserAccessPermissionRouters");

//teamRouters
const teamRouter = require("./routes/teamServiceRoute/teamRouters");
const subTeamRouter = require("./routes/teamServiceRoute/subTeamRouters");

//guestRouters
const guestRouter = require("./routes/guestServiceRoute/guestRouters");

//employeeRouters
const employeeProfileRouter = require("./routes/employeeServiceRoute/employeeProfileRouters");
const employeeJobRouter = require("./routes/employeeServiceRoute/employeeJobRouters");
const employeeIdProofRouter = require("./routes/employeeServiceRoute/employeeIdProofRouters");

//commonServiceRoute
const commonServiceRoute = require("./routes/commonServiceRoute/commonServiceRoute");

const cors = require("cors");
const db = require("./config/dbConfig");

db.connect();

const app = express();

// view engine setup
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "jade");
app.use(cors());

// app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//userRouters
app.use("/", userRouter);
app.use("/", accessPermissionRouter);
app.use("/", userAccessPermissionRouter);

//teamRouters
app.use("/", teamRouter);
app.use("/", subTeamRouter);

//guestRouters
app.use("/", guestRouter);

//employeeRouters
app.use("/", employeeProfileRouter);
app.use("/", employeeJobRouter);
app.use("/", employeeIdProofRouter);

//Common
app.use("/", commonServiceRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen({ port: 5000 }, async () => {
  console.log("Server is listen on http://localhost:5000");
  // await sequelize.authenticate();
  console.log("Database Connected");
});

module.exports = app;
