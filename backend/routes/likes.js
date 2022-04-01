const express = require('express');
const router = express.Router();

const Like = require('../models/likes');

const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/likes');

router.post('/articles/:id/likes', auth, likeCtrl.like);
router.get('/articles/:id/likes', auth, likeCtrl.getLikePerArticle);
router.delete('/articles/:id/likes', auth, likeCtrl.deleteLike);

module.exports = router;