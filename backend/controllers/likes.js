const Like = require("../models/likes");

//controller to post a like on an article
exports.like = async (req, res, next) => {
  try {
    if (req.body.userId == req.auth.userId) {
      await Like.create({
        userId: req.body.userId,
        articleId: req.params.id,
      });
      res.status(201).json({ message: "Like créé !" });
    } else {
      res.status(401).json({ error: "Requête non autorisée !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//controller to get all the likes for an articleswith the article id
exports.getLikePerArticle = async (req, res, next) => {
  try {
    const likesPerArticle = await Like.findAndCountAll({
      where: { articleId: req.params.id },
    });
    return res.status(200).json(likesPerArticle);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//controller to delete a like on an article
exports.deleteLike = async (req, res, next) => {
  try {
    const like = await Like.findOne({
      where: { userId: req.auth.userId, articleId: req.params.id },
    });
    if (!like) {
      return res.status(404).json({ error: "Like non trouvé !" });
    } else {
      await like.destroy();
      res.status(200).json({ message: "Like supprimé !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
