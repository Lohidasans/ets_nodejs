const express = require("express");
const router = express.Router();
const employeeOrnamentService = require("../../services/employeeService/employeeOrnamentService");

router.post(
  "/api/v1/createEmployeeOrnamentDetails",
  employeeOrnamentService.createEmployeeOrnamentDetails
);
router.get(
  "/api/v1/getAllEmployeeOrnamentDetails",
  employeeOrnamentService.getAllEmployeeOrnamentDetails
);
router.get(
  "/api/v1/getEmployeeOrnamentDetails/:id",
  employeeOrnamentService.getEmployeeOrnamentDetailsById
);
router.put(
  "/api/v1/replaceEmployeeOrnamentDetails/:id",
  employeeOrnamentService.replaceEmployeeOrnamentDetails
);
router.delete(
  "/api/v1/deleteEmployeeOrnamentDetails/:id",
  employeeOrnamentService.deleteEmployeeOrnamentDetails
);

module.exports = router;
