const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize (process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

module.exports = sequelize;
