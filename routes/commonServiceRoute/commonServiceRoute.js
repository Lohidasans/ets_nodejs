const express = require("express");
const router = express.Router();
const commonService = require("../../services/commonService/commonService");

router.get("/api/v1/getAllUserTypes", commonService.getAllUserTypes);
router.get("/api/v1/getAllShiftDetail", commonService.getAllShiftData);
router.get(
  "/api/v1/getAllGuestTypesDetail",
  commonService.getAllGuestTypesData
);
router.get("/api/v1/getAllTeamTypesDetail", commonService.getAllTeamTypesData);
router.get("/api/v1/getAllTeamDetail", commonService.getAllTeamData);
router.get("/api/v1/getAllStates", commonService.getAllStates);
router.get("/api/v1/getAllCategories", commonService.getAllCategories);

module.exports = router;
