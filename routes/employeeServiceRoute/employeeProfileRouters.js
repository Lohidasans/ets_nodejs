const express = require("express");
const router = express.Router();
const employeeProfileService = require("../../services/employeeService/employeeProfileService");

router.post(
  "/api/createEmployeeProfile",
  employeeProfileService.createEmployeeProfile
);
router.get(
  "/api/getAllEmployeeProfiles",
  employeeProfileService.getAllEmployeeProfile
);
router.get(
  "/api/getEmployeeProfile/:id",
  employeeProfileService.getEmployeeProfileById
);
router.put(
  "/api/replaceEmployeeProfile/:id",
  employeeProfileService.replaceEmployeeProfile
);
router.delete(
  "/api/deleteEmployeeProfile/:id",
  employeeProfileService.deleteEmployeeProfile
);

module.exports = router;
