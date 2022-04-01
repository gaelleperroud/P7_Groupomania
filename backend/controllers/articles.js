const Article = require("../models/articles");
const fs = require("fs");

exports.createArticle = async (req, res, next) => {
  try {
    await Article.create({
      title: req.body.title,
      image_url: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      content: req.body.content,
      userId: req.auth.userId,
    });
    res.status(201).json({ message: "Article créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    return res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getOneArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ where: { id: req.params.id } });
    if (!article) {
      res.status(404).json({ error: "Article non trouvé !" });
    } else {
      return res.status(200).json(article);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.modifyArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ where: { id: req.params.id } });
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé !" });
    } else if (article.userId == req.auth.userId || req.auth.role == 2) {
      if (req.file) {
        const filename = article.image_url.split("/images/")[1];
        try {
          fs.unlink(`images/${filename}`, async (err) => {
            if (err) {
              res.status(500).json({
                error: "Le fichier n'a pu être supprimé",
              });
            } else {
              article.set({
                title: req.body.title,
                image_url: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`,
                content: req.body.content,
              });
              await article.save();
              res.status(200).json({ message: "Article modifié !" });
            }
          });
        } catch (error) {
          res.status(500).json({ error });
        }
      } else {
        article.set({
          title: req.body.title,
          content: req.body.content,
        });
        await article.save();
        res.status(200).json({ message: "Article modifié !" });
      }
    } else {
      res.status(403).json({
        error: "Unauthorized request!",
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ where: { id: req.params.id } });
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé !" });
    } else if (article.userId == req.auth.userId || req.auth.role == 2) {
      const filename = article.image_url.split("/images/")[1];
      try {
        fs.unlink(`images/${filename}`, async (err) => {
          if (err) {
            res.status(500).json({
              error: "Le fichier n'a pu être supprimé",
            });
          } else {
            await article.destroy();
            res.status(200).json({ message: "Article supprimé !" });
          }
        });
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(403).json({
        error: "Unauthorized request!",
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
