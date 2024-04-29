var express = require("express");
var router = express.Router();
const accessPermissionService = require("../../services/userService/accessPermissionService");

router.post(
  "/api/createAccessPermission",
  accessPermissionService.createAccessPermission
);
router.get(
  "/api/getAllAccessPermissions",
  accessPermissionService.getAllAccessPermissions
);
router.get(
  "/api/getAccessPermissionById/:id",
  accessPermissionService.getAccessPermissionById
);
router.put(
  "/api/replaceAccessPermission/:id",
  accessPermissionService.replaceAccessPermission
);
router.delete(
  "/api/deleteAccessPermission/:id",
  accessPermissionService.deleteAccessPermission
);

module.exports = router;
