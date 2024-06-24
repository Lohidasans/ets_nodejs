const express = require("express");
const router = express.Router();
const canteenService = require("../../services/canteenService/canteenManagementService");

router.post(
    "/api/v1/createCanteenManagement",
    canteenService.createCanteenManagement
);
// router.get(
//     "/api/v1/getAllCanteenManagements",
//     canteenService.getAllCanteenManagement
// );
// router.get(
//     "/api/v1/getCanteenManagement/:id",
//     canteenService.getCanteenManagementById
// );

module.exports = router;