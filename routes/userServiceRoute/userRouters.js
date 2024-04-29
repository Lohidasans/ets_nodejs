var express = require("express");
var router = express.Router();
const auth = require("../../middleware/authentication");
const checkAuth = require("../../middleware/authorization");
const userService = require("../../services/userService/userService");
const { PERMISSIONS } = require("../../constants/enums");

router.post(
  "/api/createUser",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.createUser
);
router.post("/api/loginUser", userService.loginUser);
router.get(
  "/api/getAllUsers",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.getAllUsers
);
router.get(
  "/api/getUserById/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.getUserById
);
router.get("/api/getUsersById/:id", userService.getUserById);
router.put(
  "/api/replaceUser/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.replaceUser
);
router.patch(
  "/api/updateUser/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.updateUser
);
router.delete(
  "/api/deleteUser/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.userManagements }),
    checkAuth.checkAuthorization,
  ],
  userService.deleteUser
);

module.exports = router;
