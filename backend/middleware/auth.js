const jwt = require("jsonwebtoken");

//authentification middleware
//will decode token and compare the user id insikde the token and the user id sent in the request
// will return an error if the ids are different
//will pass to the next middleware if user Ids are identicals
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.PRIVATE_TOKEN);
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    req.auth = { userId, role };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
