const express = require("express");
const router = express.Router();
const commonService = require("../../services/commonService/commonService");

router.get("/api/getAllUserTypes", commonService.getAllUserTypes);
router.get("/api/getAllShiftDetail", commonService.getAllShiftData);
router.get("/api/getAllGuestTypesDetail", commonService.getAllGuestTypesData);
router.get("/api/getAllTeamTypesDetail", commonService.getAllTeamTypesData);
router.get("/api/getAllTeamDetail", commonService.getAllTeamData);
router.get("/api/getAllStates", commonService.getAllStates);
router.get("/api/getAllCategories", commonService.getAllCategories);

module.exports = router;
