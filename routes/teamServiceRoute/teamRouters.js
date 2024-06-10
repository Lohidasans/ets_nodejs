const express = require("express");
const router = express.Router();
const teamService = require("../../services/teamService/teamService");

router.post("/api/v1/createTeam", teamService.createTeam);
router.get("/api/v1/getAllTeams", teamService.getAllTeam);
router.get("/api/v1/getTeam/:id", teamService.getTeamById);
router.put("/api/v1/replaceTeam/:id", teamService.replaceTeam);
router.delete("/api/v1/deleteTeam/:id", teamService.deleteTeam);

module.exports = router;
