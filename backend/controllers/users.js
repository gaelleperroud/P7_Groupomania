const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");


const User = require('../models/users');

exports.signup = async (req, res, next) =>{
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            last_name:req.body.last_name,
            first_name:req.body.first_name,
            email: req.body.email,
            password: hash,
            roleId: req.body.roleId
        });
        console.log(user);
        res.status(201).json({ message: 'Utilisateur créé !' });
    } catch (error){
        res.status(500).json({ error });
    }
};

exports.login = async(req, res, next) => {
    try{
        const user = await User.findOne({ where : { email: req.body.email}});
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        } else {
            const isValid = await bcrypt.compare(req.body.password, user.password);
            if(!isValid){
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } else{
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign({ userId: user.id }, process.env.PRIVATE_TOKEN, {
                      expiresIn: "24h",
                    }), 
                });
            }
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.modifyUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};