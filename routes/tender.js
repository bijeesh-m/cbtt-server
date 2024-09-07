const express = require("express");
const tenderController = require("../controllers/tender.controller");
const authenticate = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/tenders", tenderController.tenders);
router.post("/tender", authenticate, checkRole(["Government Authority", "Admin"]), tenderController.createTender);
router.get("/tender/:id", tenderController.tenderById);
router.get("/tender", tenderController.tenderByFilter);

module.exports = router;
