const Comment = require('../models/comments');

exports.createComment = async (req, res, next) => {
    try{
        const comment = await Comment.create({
            content: req.body.content,
            articleId: req.params.id,
            userId: req.body.userId
        });
        res.status(201).json({ message: 'Commentaire créé !' });
    } catch(error){
        res.status(500).json({ error });
    }
};

exports.getAllComment = async (req, res, next) => {
    try{
        const comments = await Comment.findAll({ where: {articleId:req.params.id}});
        return res.status(200).json(comments);
    } catch (error){
        res.status(500).json({ error });
    }
};


exports.deleteComment = (req, res, next) => {

};
