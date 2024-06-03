import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config();



const authenticateUser = (req, res, next) => {


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
export default authenticateUser;
