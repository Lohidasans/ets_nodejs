var express = require("express");
var router = express.Router();
const teamService = require("../../services/teamService/teamService");

router.post(
    "/api/createTeam",
    teamService.createTeam,
);
router.get(
    "/api/getAllTeams",
    teamService.getAllTeam,
);
router.get(
    "/api/getTeam/:id",
    teamService.getTeamById
);
router.put(
    "/api/replaceTeam/:id",
    teamService.replaceTeam,
);
router.delete(
    "/api/deleteTeam/:id",
    teamService.deleteTeam,
);

module.exports = router;
