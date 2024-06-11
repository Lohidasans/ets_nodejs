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

module.exports = router;
