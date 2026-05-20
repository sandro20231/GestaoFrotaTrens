const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

const getUserByToken = async (token) => {
    
    const decoded = await jwt.verify(token, 'gft2026');
    const userid = decoded.id;
    const user = await Usuarios.findById(userid);
    return user;
}

module.exports = getUserByToken;