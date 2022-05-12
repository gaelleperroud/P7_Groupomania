const Article = require("../models/articles");
const fs = require("fs");
const User = require("../models/users");

// controller to post an article
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

// controller to get all the articles
//return an array of articles
exports.getAllArticles = async (req, res, next) => {
  const userId = req.query.userId;
  const limit = 2;
  const page = req.query.page;
  const sort = req.query.sort;
  const offset = limit * page;
  if (userId && page) {
    // for the next articles on the bookmark page (where a user can get all his own articles)
    try {
      const articles = await Article.findAll({
        limit: limit,
        offset: offset,
        where: { userId: userId },
        order: [["updatedAt", "DESC"]],
        include: { model: User, attributes: ["last_name", "first_name"] },
      });
      return res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else if (userId) {
    // same as before for the first articles
    try {
      const articles = await Article.findAll({
        limit: limit,
        where: { userId: userId },
        order: [["updatedAt", "DESC"]],
        include: { model: User, attributes: ["last_name", "first_name"] },
      });
      return res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else if (sort && page) {
    // for the next articles with aplphabetical sorting
    try {
      const articles = await Article.findAll({
        limit: limit,
        offset: offset,
        order: [["title", "ASC"]],
        include: { model: User, attributes: ["last_name", "first_name"] },
      });
      return res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else if (sort) {
    // for the first articles in alphabetical sorting
    try {
      const articles = await Article.findAll({
        limit: limit,
        order: [["title", "ASC"]],
        include: { model: User, attributes: ["last_name", "first_name"] },
      });
      return res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else if (page) {
    //for the next articles in default sorting(date)
    try {
      const articles = await Article.findAll({
        limit: limit,
        offset: offset,
        order: [["updatedAt", "DESC"]],
        include: { model: User, attributes: ["last_name", "first_name"] },
      });
      return res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    try {
      // for the first articles in default sorting(date)
      const articles = await Article.findAll({
        limit: limit,
        order: [["updatedAt", "DESC"]],
        include: { model: User, attributes: ["last_name", "first_name"] },
      });
      return res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

//controller to get one article with his id
//return the articles as an object
exports.getOneArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: { id: req.params.id },
      include: { model: User, attributes: ["last_name", "first_name"] },
    });
    if (!article) {
      res.status(404).json({ error: "Article non trouvé !" });
    } else {
      return res.status(200).json(article);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//controller to modify an article
exports.modifyArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ where: { id: req.params.id } });
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé !" });
    } else if (article.userId == req.auth.userId || req.auth.role == 2) {
      if (req.file) {
        //first case: if the image is modified
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
        //second case the image is not modified
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

//controller to delete an article
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
