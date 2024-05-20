const express = require("express");
const router = express.Router();
const subTeamService = require("../../services/teamService/subTeamService");

router.post("/api/createSubTeam", subTeamService.createSubTeam);
router.get("/api/getAllSubTeams", subTeamService.getAllSubTeam);
router.get("/api/getSubTeam/:id", subTeamService.getSubTeamById);
router.put("/api/replaceSubTeam/:id", subTeamService.replaceSubTeam);
router.delete("/api/deleteSubTeam/:id", subTeamService.deleteSubTeam);

module.exports = router;
