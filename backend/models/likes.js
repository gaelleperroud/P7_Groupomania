const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./users');
const Article = require('./articles');

const Like = sequelize.define('like', {
    userId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    articleId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
  
    }
});

Article.hasMany(Like, { foreignKey: {allowNull: false}});
User.hasMany(Like, { foreignKey: {allowNull: false}});
Like.belongsTo(User);
Like.belongsTo(Article);

module.exports = Like;

