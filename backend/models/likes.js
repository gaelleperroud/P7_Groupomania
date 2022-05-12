const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./users");
const Article = require("./articles");

//model for like including userId and articleId
const Like = sequelize.define("like", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  articleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});

//relation one to many between like and articles and like and user
Article.hasMany(Like, { foreignKey: { allowNull: false } });
User.hasMany(Like, { foreignKey: { allowNull: false } });
Like.belongsTo(User);
Like.belongsTo(Article);

module.exports = Like;
