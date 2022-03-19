module.exports = (req, res, next) =>{
    isAllowed();
}

function isAllowed(a){
//on compare l'id user de la ressource (a) avec l'id user
//si ça match next

//ou sinon est ce que l'user a les droits admin
// si oui next

//sinon erreur 403 unauthorized
}