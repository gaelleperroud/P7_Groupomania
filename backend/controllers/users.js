const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      email: req.body.email,
      password: hash,
      roleId: req.body.roleId,
    });
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    } else {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      } else {
        res.status(200).json({
          userId: user.id,
          role: user.roleId,
          token: jwt.sign(
            { userId: user.id, role: user.roleId },
            process.env.PRIVATE_TOKEN,
            {
              expiresIn: "24h",
            }
          ),
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.modifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    if (user.id == req.auth.userId) {
      const hash = await bcrypt.hash(req.body.password, 10);
      user.set({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email,
        password: hash,
      });
      await user.save();
      res.status(200).json({ message: "Utilisateur modifié !" });
    } else if (req.auth.role == 2) {
      user.roleId = req.body.roleId;
      await user.save();
      res.status(200).json({ message: "Rôle de l'utilisateur modifié" });
    } else {
      res.status(403).json({
        error: "Unauthorized request!",
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    } else if (user.id == req.auth.userId || req.auth.role == 2) {
      await user.destroy();
      res.status(200).json({ message: "Utilisateur supprimé !" });
    } else {
      res.status(403).json({
        error: "Unauthorized request!",
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
