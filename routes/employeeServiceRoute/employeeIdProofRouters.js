const express = require("express");
const router = express.Router();
const employeeIdProofService = require("../../services/employeeService/employeeIdProofService");

router.post(
  "/api/v1/createEmployeeIdProof",
  employeeIdProofService.createEmployeeIdProof
);
router.get(
  "/api/v1/getAllEmployeeIdProofs",
  employeeIdProofService.getAllEmployeeIdProof
);
router.get(
  "/api/v1/getEmployeeIdProof/:id",
  employeeIdProofService.getEmployeeIdProofById
);
router.put(
  "/api/v1/replaceEmployeeIdProof/:id",
  employeeIdProofService.replaceEmployeeIdProof
);
router.delete(
  "/api/v1/deleteEmployeeIdProof/:id",
  employeeIdProofService.deleteEmployeeIdProof
);

module.exports = router;
