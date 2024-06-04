import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const authenticateUser = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ status: false, message: 'No token available' });
    }

    jwt.verify(token, process.env.WEB_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};

export const authenticateAdmin = (req, res, next) => {
    
    console.log('Authenticating admin');
  
    const token = req.cookies.access_admin_token

    console.log(token,"token token")

    if (!token) {
        return res.status(401).json({ status: false, message: 'No token available' });
    }

    jwt.verify(token, process.env.WEB_TOKEN, (err, decoded) => {
        if (err) {
            return res.json({ status: false, message: 'Unauthorized' });
        }
        req.admin = decoded;
        next();
    });
};

export default {
    authenticateUser,
    authenticateAdmin
};
