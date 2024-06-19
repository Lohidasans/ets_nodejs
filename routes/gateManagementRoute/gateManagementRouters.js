var express = require("express");
var router = express.Router();
const gateService = require("../../services/gateService/gateManagementService");

router.post(
    "/api/v1/createGateManagement",
    gateService.createGateManagement,
);
router.get(
    "/api/v1/getAllGateManagements",
    gateService.getAllGateManagement,
);
router.get(
    "/api/v1/getGateManagement/:id",
    gateService.getGateManagementById
);
router.put(
    "/api/v1/replaceGateManagement/:id",
    gateService.replaceGateManagement,
);
router.patch(
    "/api/v1/updateGateManagement/:id",
    gateService.updateGateManagement,
);
router.delete(
    "/api/v1/deleteGateManagement/:id",
    gateService.deleteGateManagement,
);

module.exports = router;
