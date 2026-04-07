const jwt = require('jsonwebtoken');
const Student = require("../models/studentModels");
const Guardian = require("../models/guardianModels");
const Admin = require("../models/adminModels");
 require('dotenv').config();

const isAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded.payload;
        if (decoded.payload.role === 'student') {
            req.user = await Student.findById(decoded.payload.id).select('-password');
        } else if (decoded.payload.role === 'guardian') {
            req.user = await Guardian.findById(decoded.payload.id).select('-password');
        } else if (decoded.payload.role === 'admin') {
            req.user = await Admin.findById(decoded.payload.id).select('-password');
        }
        next();
    } catch (err) {
        console.error('Auth Error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};



module.exports = isAuth;