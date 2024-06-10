const express = require("express");
const router = express.Router();
const employeeJobService = require("../../services/employeeService/employeeJobService");

router.post("/api/v1/createEmployeeJob", employeeJobService.createEmployeeJob);
router.get("/api/v1/getAllEmployeeJobs", employeeJobService.getAllEmployeeJob);
router.get("/api/v1/getEmployeeJob/:id", employeeJobService.getEmployeeJobById);
router.put(
  "/api/v1/replaceEmployeeJob/:id",
  employeeJobService.replaceEmployeeJob
);
router.delete(
  "/api/v1/deleteEmployeeJob/:id",
  employeeJobService.deleteEmployeeJob
);

module.exports = router;
