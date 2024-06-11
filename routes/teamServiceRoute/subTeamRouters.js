const express = require("express");
const router = express.Router();
const subTeamService = require("../../services/teamService/subTeamService");

router.post("/api/v1/createSubTeam", subTeamService.createSubTeam);
router.get("/api/v1/getAllSubTeams", subTeamService.getAllSubTeam);
router.get("/api/v1/getSubTeam/:id", subTeamService.getSubTeamById);
router.put("/api/v1/replaceSubTeam/:id", subTeamService.replaceSubTeam);
router.delete("/api/v1/deleteSubTeam/:id", subTeamService.deleteSubTeam);

module.exports = router;
