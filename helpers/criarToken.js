const jwt = require('jsonwebtoken');

const criarToken = async (user, req, res) => {
    const token = jwt.sgin({
        id: user.id,
        nome: user.nome
    }, 'gft2026')
    res.status(200).json({ message: "token criado com sucesso", token: token, userid: user._id });
}

module.exports = criarToken;