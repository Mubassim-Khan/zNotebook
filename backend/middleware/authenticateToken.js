const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_TOKEN = process.env.JWT_SECRET_SIGN;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: "Unauthorized, Token Not Found" });

    jwt.verify(token, JWT_TOKEN, (err, user) => {
        if (err) return res.status(403).send({ error: "Insufficient Permissions" });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;