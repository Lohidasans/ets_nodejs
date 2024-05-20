const express = require("express");
const router = express.Router();
const guestService = require("../../services/guestService/guestService");

router.post("/api/createGuest", guestService.createGuest);
router.get("/api/getGuestCompany", guestService.getGuestCompany);
router.get("/api/getAllGuests", guestService.getAllGuest);
router.get("/api/getGuest/:id", guestService.getGuestById);
router.put("/api/replaceGuest/:id", guestService.replaceGuest);
router.delete("/api/deleteGuest/:id", guestService.deleteGuest);

module.exports = router;
