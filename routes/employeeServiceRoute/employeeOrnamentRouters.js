const express = require("express");
const router = express.Router();
const employeeOrnamentService = require("../../services/employeeService/employeeOrnamentService");

router.post(
  "/api/createEmployeeOrnamentDetails",
  employeeOrnamentService.createEmployeeOrnamentDetails
);
router.get(
  "/api/getAllEmployeeOrnamentDetails",
  employeeOrnamentService.getAllEmployeeOrnamentDetails
);
router.get(
  "/api/getEmployeeOrnamentDetails/:id",
  employeeOrnamentService.getEmployeeOrnamentDetailsById
);
router.put(
  "/api/replaceEmployeeOrnamentDetails/:id",
  employeeOrnamentService.replaceEmployeeOrnamentDetails
);
router.delete(
  "/api/deleteEmployeeOrnamentDetails/:id",
  employeeOrnamentService.deleteEmployeeOrnamentDetails
);

module.exports = router;
