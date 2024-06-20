const express = require("express");
const router = express.Router();
const securityService = require("../../services/securityService/securityManagementService");

router.post(
  "/api/v1/createSecurityManagement",
  securityService.createSecurityManagement
);
router.get(
  "/api/v1/getAllSecurityManagements",
  securityService.getAllSecurityManagement
);
router.get(
  "/api/v1/getSecurityManagement/:id",
  securityService.getSecurityManagementById
);
router.put(
  "/api/v1/replaceSecurityManagement/:id",
  securityService.replaceSecurityManagement
);
router.patch(
  "/api/v1/updateSecurityManagement/:id",
  securityService.updateSecurityManagement
);
router.delete(
  "/api/v1/deleteSecurityManagement/:id",
  securityService.deleteSecurityManagement
);
router.get(
  "/api/v1/getEmployeeTrackingDetails",
  securityService.getEmployeeTracking
);
router.get(
  "/api/v1/getUnEnteredEmployees",
  securityService.getUnEnteredEmployees
);

module.exports = router;
