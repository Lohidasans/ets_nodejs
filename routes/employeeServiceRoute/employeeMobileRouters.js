const express = require("express");
const router = express.Router();
const employeeMobileService = require("../../services/employeeService/employeeMobileService");

router.post(
  "/api/v1/createEmployeeMobileDetails",
  employeeMobileService.createEmployeeMobileDetails
);
router.get(
  "/api/v1/getAllEmployeeMobileDetails",
  employeeMobileService.getAllEmployeeMobileDetails
);
router.get(
  "/api/v1/getEmployeeMobileDetails/:id",
  employeeMobileService.getEmployeeMobileDetailsById
);
router.put(
  "/api/v1/replaceEmployeeMobileDetails/:id",
  employeeMobileService.replaceEmployeeMobileDetails
);
router.delete(
  "/api/v1/deleteEmployeeMobileDetails/:id",
  employeeMobileService.deleteEmployeeMobileDetails
);

module.exports = router;
