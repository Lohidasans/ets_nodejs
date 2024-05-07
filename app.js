const createError = require("http-errors");
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const multer = require('multer');
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
const employeeMobileRouter = require("./routes/employeeServiceRoute/employeeMobileRouters");
const employeeOrnamentRouter = require("./routes/employeeServiceRoute/employeeOrnamentRouters");

//securityRouters
const securityRouter = require("./routes/securityServiceRoute/securityRouters");

//commonServiceRoute
const commonServiceRoute = require("./routes/commonServiceRoute/commonServiceRoute");

//imageUploadRoute
// const imageUploadRoute = require("./routes/imageUploadRoute/imageUploadRoute");

const cors = require("cors");
const db = require("./config/dbConfig");
const { uploadImage } = require("./services/imageUploadService/imageUploadService");

db.connect();

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

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

//imageUpload 
// app.use('/api', imageUploadRoute); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Save uploaded images to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname); // Rename the uploaded file with a unique name
  }
});

const upload = multer({ storage: storage });

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
      if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    // Upload the image and get the URL
    const imageUrl = await uploadImage(req.file);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
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
  // await sequelize.authenticate();
  console.log("Database Connected");
});

module.exports = app;
