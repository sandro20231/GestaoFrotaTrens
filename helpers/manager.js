const getToken = require('./getToken');
const getUserByToken = require('./getUserByToken');

const manager = (req, res, next) => {
    const token = await getToken(req);
    const user = await getUserByToken(token);

    if (user.funcao !== "gerente") {
        res.status(422).json({ message: "Desculpe mas você não tem permissão de efetuar esta operação" });
        return;
    }

    next();
}

module.exports = manager;