const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./utils/database');
const path = require('path');


const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const commentRoutes = require('./routes/comments');


const User = require('./models/users');
const Article = require('./models/articles');
const Comment = require('./models/comments');
const Role = require('./models/roles');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//sequelize.sync({ alter: true });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1', userRoutes);
app.use('/api/v1', articleRoutes);
app.use('/api/v1', commentRoutes);

module.exports = app;