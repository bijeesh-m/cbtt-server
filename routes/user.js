const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.delete("/logout", userController.logout);
router.get("/users", authenticate, checkRole(["Admin"]), userController.users);
router.put("/users/:id/status", authenticate, checkRole(["Admin"]), userController.user);

module.exports = router;
