const Comment = require("../models/comments");

exports.createComment = async (req, res, next) => {
  try {
    await Comment.create({
      content: req.body.content,
      articleId: req.params.id,
      userId: req.auth.userId,
    });
    res.status(201).json({ message: "Commentaire créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getAllComment = async (req, res, next) => {
  try {
    const comments = await Comment.findAndCountAll({
      where: { articleId: req.params.id },
    });
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ where: { userId:req.auth.userId , articleId: req.params.id} });
    if (!comment) {
      return res.status(404).json({ error: "Commentaire non trouvé !" });
    } else if (comment.userId == req.auth.userId || req.auth.role == 2) {
      await comment.destroy();
      res.status(200).json({ message: "Commentaire supprimé !" });
    } else {
      res.status(403).json({ error: "Unauthorized request!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
