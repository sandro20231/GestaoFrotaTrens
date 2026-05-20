const getToken = require('./getToken');
const getUserByToken = require('./getUserByToken');
const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(422).json({ message: "Não veio a autorização do header" });
        return;
    }

    const token = getToken(req);
    console.log(token)
    if (!token) {
        res.status(404).json({ message: "Acesso negado" });
        return;
    }

    try {
        const verify = jwt.verify(token, 'gft2026');
        req.user = verify;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
}

module.exports = authorization;