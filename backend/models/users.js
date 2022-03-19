const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');
const Role = require('./roles');


const User = sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    last_name: { type: Sequelize.STRING, allowNull:false },
    first_name: {type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING(500), allowNull:false, unique: true},
    password: { type: Sequelize.STRING, allowNull: false }
});

//relation one to many between users and roles
Role.hasMany(User, { foreignKey: {allowNull: false}});
User.belongsTo(Role);


module.exports = User;