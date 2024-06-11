const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authentication");
const checkAuth = require("../../middleware/authorization");
const userService = require("../../services/userService/userService");
const { PERMISSIONS } = require("../../constants/enums");

router.post(
  "/api/v1/createUser",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.createUser
);
router.post("/api/v1/loginUser", userService.loginUser);
router.get(
  "/api/v1/getAllUsers",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.getAllUsers
);

router.get("/api/v1/getAllAdminUsers", userService.getAllUsers);

router.get(
  "/api/v1/getUserById/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.getUserById
);
router.get("/api/v1/getUsersById/:id", userService.getUserById);
router.put(
  "/api/v1/replaceUser/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.replaceUser
);
router.patch(
  "/api/v1/updateUser/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.updateUser
);
router.delete(
  "/api/v1/deleteUser/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.deleteUser
);

module.exports = router;
