const express = require("express");
const router = express.Router();
const employeeIdProofService = require("../../services/employeeService/employeeIdProofService");

router.post(
  "/api/createEmployeeIdProof",
  employeeIdProofService.createEmployeeIdProof
);
router.get(
  "/api/getAllEmployeeIdProofs",
  employeeIdProofService.getAllEmployeeIdProof
);
router.get(
  "/api/getEmployeeIdProof/:id",
  employeeIdProofService.getEmployeeIdProofById
);
router.put(
  "/api/replaceEmployeeIdProof/:id",
  employeeIdProofService.replaceEmployeeIdProof
);
router.delete(
  "/api/deleteEmployeeIdProof/:id",
  employeeIdProofService.deleteEmployeeIdProof
);

module.exports = router;
