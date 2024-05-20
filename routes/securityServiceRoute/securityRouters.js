const express = require("express");
const router = express.Router();
const securityService = require("../../services/securityService/securityManagementService");

router.post(
  "/api/createSecurityManagement",
  securityService.createSecurityManagement
);
router.get(
  "/api/getAllSecurityManagements",
  securityService.getAllSecurityManagement
);
router.get(
  "/api/getSecurityManagement/:id",
  securityService.getSecurityManagementById
);
router.put(
  "/api/replaceSecurityManagement/:id",
  securityService.replaceSecurityManagement
);
router.patch(
  "/api/updateSecurityManagement/:id",
  securityService.updateSecurityManagement
);
router.delete(
  "/api/deleteSecurityManagement/:id",
  securityService.deleteSecurityManagement
);

module.exports = router;
