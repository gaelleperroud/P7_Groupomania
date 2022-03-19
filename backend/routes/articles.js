const express = require('express');
const router = express.Router();

const Article = require('../models/articles');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const isAllowed = require('../middleware/roles');

const articleCtrl = require('../controllers/articles');

router.post('/articles',auth,multer, articleCtrl.createArticle);
router.get('/articles', auth, articleCtrl.getAllArticles);
router.get('/articles/:id', auth, articleCtrl.getOneArticle);
router.put('/articles/:id', auth, isAllowed,multer, articleCtrl.modifyArticle);
router.delete('/articles/:id', auth, isAllowed, articleCtrl.deleteArticle);



module.exports = router;