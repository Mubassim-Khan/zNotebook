const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_TOKEN

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_TOKEN, (err, user) => {
        if (err) return res.status(403).send({ error: "Authentication Failed, Token Not Found." });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;