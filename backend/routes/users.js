const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/users");

router.post("/auth/signup", userCtrl.signup);
router.post("/auth/login", userCtrl.login);
router.put("/auth/signup/:id", auth, userCtrl.modifyUser);
router.delete("/auth/signup/:id", auth, userCtrl.deleteUser);

module.exports = router;
