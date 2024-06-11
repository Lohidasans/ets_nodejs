const express = require("express");
const router = express.Router();
const accessPermissionService = require("../../services/userService/accessPermissionService");

router.post(
  "/api/v1/createAccessPermission",
  accessPermissionService.createAccessPermission
);
router.get(
  "/api/v1/getAllAccessPermissions",
  accessPermissionService.getAllAccessPermissions
);
router.get(
  "/api/v1/getAccessPermissionById/:id",
  accessPermissionService.getAccessPermissionById
);
router.put(
  "/api/v1/replaceAccessPermission/:id",
  accessPermissionService.replaceAccessPermission
);
router.delete(
  "/api/v1/deleteAccessPermission/:id",
  accessPermissionService.deleteAccessPermission
);

module.exports = router;
