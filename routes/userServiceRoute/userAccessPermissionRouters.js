const express = require("express");
const router = express.Router();
const userAccessPermissionService = require("../../services/userService/userAccessPermissionService");

router.post(
  "/api/createUserAccessPermission",
  userAccessPermissionService.createUserAccessPermission
);
router.get(
  "/api/getAllUserAccessPermissions/:user_id",
  userAccessPermissionService.getAllUserAccessPermissions
);
router.get(
  "/api/getUserAccessPermission/:id",
  userAccessPermissionService.getUserAccessPermissionById
);
router.put(
  "/api/replaceUserAccessPermission/:id",
  userAccessPermissionService.replaceUserAccessPermission
);
router.delete(
  "/api/deleteUserAccessPermission/:id",
  userAccessPermissionService.deleteUserAccessPermission
);

module.exports = router;
