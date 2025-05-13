const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decodedValue = jwt.verify(token, secret);
        req.user = decodedValue.user;
        next();
    } catch (e) {
        return res.status(500).json({ message: 'Invalid token'});
    }
}

module.exports = verifyToken;