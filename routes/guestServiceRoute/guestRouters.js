const express = require("express");
const router = express.Router();
const guestService = require("../../services/guestService/guestService");

router.post("/api/v1/createGuest", guestService.createGuest);
router.get("/api/v1/getGuestCompany", guestService.getGuestCompany);
router.get("/api/v1/getAllGuests", guestService.getAllGuest);
router.get("/api/v1/getGuest/:id", guestService.getGuestById);
router.put("/api/v1/replaceGuest/:id", guestService.replaceGuest);
router.delete("/api/v1/deleteGuest/:id", guestService.deleteGuest);

module.exports = router;
