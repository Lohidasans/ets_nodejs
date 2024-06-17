const express = require("express");
const router = express.Router();
const employeeProfileService = require("../../services/employeeService/employeeProfileService");

router.post(
  "/api/v1/createEmployeeProfile",
  employeeProfileService.createEmployeeProfile
);
router.get(
  "/api/v1/getAllEmployeeProfiles",
  employeeProfileService.getAllEmployeeProfile
);
router.get(
  "/api/v1/getEmployeeProfile/:id",
  employeeProfileService.getEmployeeProfileById
);
router.put(
  "/api/v1/replaceEmployeeProfile/:id",
  employeeProfileService.replaceEmployeeProfile
);
router.delete(
  "/api/v1/deleteEmployeeProfile/:id",
  employeeProfileService.deleteEmployeeProfile
);
router.get("/api/v1/deviceList", employeeProfileService.listDevices);
router.post("/api/v1/deviceAssign", employeeProfileService.deviceAssign);
router.post("/api/v1/enrollUser", employeeProfileService.enrollUser);
router.post("/api/v1/frEnrol", employeeProfileService.frEnrol);
module.exports = router;
