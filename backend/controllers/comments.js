const Comment = require("../models/comments");
const User = require("../models/users");

//controller to post a comment
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

//controller to get all the comments for an article
exports.getAllComment = async (req, res, next) => {
  try {
    const comments = await Comment.findAndCountAll({
      where: { articleId: req.params.id },
      order: [["updatedAt", "DESC"]],
      include: { model: User, attributes: ["last_name", "first_name"] },
    });
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//controller to delete a comment with its id
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
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
