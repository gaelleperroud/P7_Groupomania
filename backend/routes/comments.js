const express = require('express');
const router = express.Router();

const Comment = require('../models/comments');

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.post('/articles/:id/comments', auth, commentCtrl.createComment);
router.get('/articles/:id/comments', auth, commentCtrl.getAllComment);
router.delete('/articles/:id/comments', auth, commentCtrl.deleteComment);


module.exports = router;