var express = require("express");
var router = express.Router();
const commonService = require("../../services/commonService/commonService");

router.get("/api/getAllUserTypes", commonService.getAllUserTypes);
router.get("/api/getAllShiftDetail", commonService.getAllShiftData);

module.exports = router;
