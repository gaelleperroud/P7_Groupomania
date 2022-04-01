const express = require('express');
const router = express.Router();

const Article = require('../models/articles');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/articles');

router.post('/articles',auth,multer, articleCtrl.createArticle);
router.get('/articles', auth, articleCtrl.getAllArticles);
router.get('/articles/:id', auth, articleCtrl.getOneArticle);
router.put('/articles/:id', auth, multer, articleCtrl.modifyArticle);
router.delete('/articles/:id', auth, articleCtrl.deleteArticle);



module.exports = router;