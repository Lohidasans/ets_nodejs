const express = require("express");
const router = express.Router();
const userAccessPermissionService = require("../../services/userService/userAccessPermissionService");

router.post(
  "/api/v1/createUserAccessPermission",
  userAccessPermissionService.createUserAccessPermission
);
router.get(
  "/api/v1/getAllUserAccessPermissions/:user_id",
  userAccessPermissionService.getAllUserAccessPermissions
);
router.get(
  "/api/v1/getUserAccessPermission/:id",
  userAccessPermissionService.getUserAccessPermissionById
);
router.put(
  "/api/v1/replaceUserAccessPermission/:id",
  userAccessPermissionService.replaceUserAccessPermission
);
router.delete(
  "/api/v1/deleteUserAccessPermission/:id",
  userAccessPermissionService.deleteUserAccessPermission
);

module.exports = router;
