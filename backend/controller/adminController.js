import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import userModel from '../model/userModel.js'
dotenv.config()

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD


const adminCredentials = {
    email: email,
    password: password,
};

const adminLogin = async(req,res)=>{
    try {
        const { username, password } = req.body;
        if (username === adminCredentials.username && password === adminCredentials.password) {

            const token = jwt.sign({ email: email}, process.env.WEB_TOKEN, { expiresIn: '1d' });
            console.log(token)
            res.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error)
    }
}

const getUser = async (req,res)=>{
    try {
        const searchQuery = req.query.search;
        let user = [];

        if (searchQuery) {
            user = await userModel.find({
                $or: [
                    { email: { $regex: searchQuery, $options: 'i' } }
                ]
            });
        } else {
            user = await userModel.find({});
           
        }

        if(user.length>0){
            console.log(user,"userssssssssssssssss")
            res.json({status:true,data:user})
        }else{
            res.json({status:false,message:"no users found"})
        }
        
    } catch (error) {
    console.log(error)
    }
}

export {
    adminLogin,
    getUser
}
