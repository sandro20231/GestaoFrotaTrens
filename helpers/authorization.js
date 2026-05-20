const getToken = require('./getToken');
const getUserByToken = require('./getUserByToken');
const jwt = require('jsonwebtoken');

const authorization = ascyn((req, res, next) => {
    if (!req.headers.authorization) {
        res.status(422).json({ message: "Não veio a autorização do header" });
        return;
    }

    const token = await getToken(req);

    if (!token) {
        res.status(404).json({ message: "Acesso negado" });
        return;
    }

    try {
        const verify = await jwt.verify(token, 'gtf2026');
        req.user = verify;
        next();
    } catch (err) {
        res.status(500).json({ message: err });
        return;
    }
})

module.exports = authorization;