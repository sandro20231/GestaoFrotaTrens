const getToken = require('./getToken');
const getUserByToken = require('./getUserByToken');

const manager = async (req, res, next) => {
    const usuario = req.user;
    
    
    if (usuario.funcao !== "gerente") {
        res.status(422).json({ message: "Desculpe mas você não tem permissão de efetuar esta operação" });
        return;
    }

    next();
}

module.exports = manager;