const express = require("express");
const { handleLogin, handleRegister, handleCheckToken } = require("../controllers/userController");
const { handleMessage } = require("../controllers/botController");
const { authenticate } = require("../middleware/user.middleware");

const router = express.Router();

router.post("/auth/signup", handleRegister);
router.post("/auth/login", handleLogin);
router.get("/auth/checkToken", authenticate, handleCheckToken);
router.post("/bot", authenticate, handleMessage);

module.exports = router;

