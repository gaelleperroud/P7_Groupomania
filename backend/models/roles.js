const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

//model for the role table including the id and the name of the role
const Role = sequelize.define("role", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Role;
