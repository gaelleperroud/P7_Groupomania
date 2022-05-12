const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./users");

// model for articles including id, title, content and image_url
const Article = sequelize.define("article", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: Sequelize.STRING(500), allowNull: false },
  image_url: { type: Sequelize.STRING(500), allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
});

//relation one to many between users and articles
User.hasMany(Article, { foreignKey: { allowNull: false } });
Article.belongsTo(User);

module.exports = Article;
