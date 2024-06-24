const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
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

//gateRouters
const gateRouter = require("./routes/gateManagementRoute/gateManagementRouters");

//employeeRouters
const employeeProfileRouter = require("./routes/employeeServiceRoute/employeeProfileRouters");
const employeeJobRouter = require("./routes/employeeServiceRoute/employeeJobRouters");
const employeeIdProofRouter = require("./routes/employeeServiceRoute/employeeIdProofRouters");
const employeeMobileRouter = require("./routes/employeeServiceRoute/employeeMobileRouters");
const employeeOrnamentRouter = require("./routes/employeeServiceRoute/employeeOrnamentRouters");

//securityRouters
const securityRouter = require("./routes/securityServiceRoute/securityRouters");

//canteenRouters
const canteenRouters = require("./routes/canteenServiceRoute/canteenServiceRouters");

//commonServiceRoute
const commonServiceRoute = require("./routes/commonServiceRoute/commonServiceRoute");

//Image Upload Route
const ImageUploadRoute = require("./routes/imageUploadRoute/imageUploadRoute");

const cors = require("cors");
const db = require("./config/dbConfig");

db.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

//userRouters
app.use("/", userRouter);
app.use("/", accessPermissionRouter);
app.use("/", userAccessPermissionRouter);

//teamRouters
app.use("/", teamRouter);
app.use("/", subTeamRouter);

//guestRouters
app.use("/", guestRouter);

//gateRouters
app.use("/", gateRouter);

//employeeRouters
app.use("/", employeeProfileRouter);
app.use("/", employeeJobRouter);
app.use("/", employeeIdProofRouter);
app.use("/", employeeMobileRouter);
app.use("/", employeeOrnamentRouter);

//securityRouters
app.use("/", securityRouter);

//canteenRouters
app.use("/", canteenRouters);

//Common
app.use("/", commonServiceRoute);
app.use("/", ImageUploadRoute);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(function (req, res, next) {
  next(createError(404)); 
});

app.listen({ port: 5000 }, async () => {
  console.log("Server is listen on http://localhost:5000");
  console.log("Database Connected");
});

module.exports = app;
