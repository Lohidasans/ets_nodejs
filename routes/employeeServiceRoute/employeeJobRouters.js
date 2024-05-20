const express = require("express");
const router = express.Router();
const employeeJobService = require("../../services/employeeService/employeeJobService");

router.post("/api/createEmployeeJob", employeeJobService.createEmployeeJob);
router.get("/api/getAllEmployeeJobs", employeeJobService.getAllEmployeeJob);
router.get("/api/getEmployeeJob/:id", employeeJobService.getEmployeeJobById);
router.put(
  "/api/replaceEmployeeJob/:id",
  employeeJobService.replaceEmployeeJob
);
router.delete(
  "/api/deleteEmployeeJob/:id",
  employeeJobService.deleteEmployeeJob
);

module.exports = router;
