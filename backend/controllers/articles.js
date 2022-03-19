const Article = require('../models/articles');

exports.createArticle = async(req, res, next) => {
    try{
        const article = await Article.create({
            title:req.body.title,
            image_url:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            content: req.body.content,
            userId: req.body.userId
        });
        res.status(201).json({ message: 'Article créé !' });
    } catch (error){
        res.status(500).json({ error });
    }
};

exports.getAllArticles = async (req, res, next) => {
    try{
        const articles = await Article.findAll();
        return res.status(200).json(articles);
    } catch (error){
        res.status(500).json({ error });
    }
};

exports.getOneArticle = async(req, res, next) => {
    try{
        const article = await Article.findOne({ where : {id: req.params.id}});
        return res.status(200).json(article);
    } catch(error){
        res.status(500).json({ error });
    }
};

exports.modifyArticle = (req, res, next) => {

};

exports.deleteArticle = (req, res, next) => {

};
