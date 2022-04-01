const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');


const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1', userRoutes);
app.use('/api/v1', articleRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v1', likeRoutes);

module.exports = app;