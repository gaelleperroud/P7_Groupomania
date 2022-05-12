const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./users");
const Article = require("./articles");

//model for comments including id and content
const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: { type: Sequelize.TEXT, allowNull: false },
});

//relation one to many between users and comments and between articles and comments
Article.hasMany(Comment, { foreignKey: { allowNull: false } });
User.hasMany(Comment, { foreignKey: { allowNull: false } });
Comment.belongsTo(User);
Comment.belongsTo(Article);

module.exports = Comment;
