const express = require('express');
const router = express.Router();

const User = require('../models/users');

const isAllowed = require('../middleware/roles');

const userCtrl = require('../controllers/users');


router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);
router.put('/auth/signup', isAllowed, userCtrl.modifyUser);
router.delete('/auth/signup', isAllowed, userCtrl.deleteUser);


module.exports = router;