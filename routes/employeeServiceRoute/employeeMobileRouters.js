var express = require("express");
var router = express.Router();
const employeeMobileService = require("../../services/employeeService/employeeMobileService");

router.post(
    "/api/createEmployeeMobileDetails",
    employeeMobileService.createEmployeeMobileDetails,
);
router.get(
    "/api/getAllEmployeeMobileDetails",
    employeeMobileService.getAllEmployeeMobileDetails,
);
router.get(
    "/api/getEmployeeMobileDetails/:id",
    employeeMobileService.getEmployeeMobileDetailsById
);
router.put(
    "/api/replaceEmployeeMobileDetails/:id",
    employeeMobileService.replaceEmployeeMobileDetails,
);
router.delete(
    "/api/deleteEmployeeMobileDetails/:id",
    employeeMobileService.deleteEmployeeMobileDetails,
);

module.exports = router;
