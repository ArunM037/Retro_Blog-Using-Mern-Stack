const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization required' });
    }

    const token = authorization.split(' ')[1];

    try {

        const { _id } = jwt.verify(token, process.env.SECRETE);
        req.user = await User.findOne({ _id }).select('_id');
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
