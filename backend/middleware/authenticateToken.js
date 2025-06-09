const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_TOKEN

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