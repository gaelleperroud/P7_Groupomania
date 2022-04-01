const User = require("../models/users");

module.exports = (req, res, next) =>{
    isAllowed();
}

async function isAllowed(ressource){
    const user = await User.findOne({ where: { id: req.auth.userId}})
    if (ressource.userId == user.id || user.roleId == 2){
        next();
    } else{
        res.status(403).json({
            error: new Error('Unauthorized request!') 
        });
    }
}