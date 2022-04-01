const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.PRIVATE_TOKEN);
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    req.auth = { userId, role };  
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
    } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
    }
};