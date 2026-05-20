const getToken = (req) => {
    const headerToken = req.headers.authorization;
    const token = headerToken.split(" ")[1];
    return token;
    
}

module.exports = getToken;