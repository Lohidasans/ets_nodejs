const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

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
const employeeMobileRouter = require("./routes/employeeServiceRoute/employeeMobileRouters");
const employeeOrnamentRouter = require("./routes/employeeServiceRoute/employeeOrnamentRouters");

//securityRouters
const securityRouter = require("./routes/securityServiceRoute/securityRouters");

//commonServiceRoute
const commonServiceRoute = require("./routes/commonServiceRoute/commonServiceRoute");

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Create multer object
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    },
  }),
});

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
app.use("/", employeeMobileRouter);
app.use("/", employeeOrnamentRouter);

//securityRouters
app.use("/", securityRouter);

//Common
app.use("/", commonServiceRoute);

// Image Upload Routes
app.post("/api/upload", imageUpload.single("image"), (req, res) => {
  console.log(req.file);
  const imageUrl = `http://localhost:5000/api/image/${req.file.filename}`;
  res.status(201).send({
    statusCode: 201,
    message: "Image Upload Successfully!",
    data: { imageUrl: imageUrl, fileName: req.file.originalname },
  });
});

// Image Get Routes
app.get("/api/image/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullFilepath = path.join(dirname, "images/" + filename);
  return res.sendFile(fullFilepath);
});

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
