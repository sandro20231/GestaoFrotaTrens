const jwt = require('jsonwebtoken');

const criarToken = async (user, req, res) => {
    const token = jwt.sign({
        id: user._id,
        nome: user.nome,
        funcao:user.funcao
    }, 'gft2026')
    return res.status(200).json({ message: "token criado com sucesso", token: token, userid: user._id });
}

module.exports = criarToken;