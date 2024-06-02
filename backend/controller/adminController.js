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

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === adminCredentials.username && password === adminCredentials.password) {

            const token = jwt.sign({ email: email }, process.env.WEB_TOKEN, { expiresIn: '1d' });
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

const getUser = async (req, res) => {
    try {

    
        const search = req.query.search || '';
        const page = parseInt(req.query.page);
        const limit = 3;
        const skip = (page - 1) * limit;


        console.log(page,"page");

        const query = search?{email:{$regex:search,$options:'i'}}: {};

        console.log(query,"search query")


        const user = await userModel.find(query).select("-password").skip(skip).limit(limit);

        const totalUser = await userModel.countDocuments();
        const totalPages = Math.ceil(totalUser/limit);

        console.log(user,"search user")

        if (user.length > 0) {

            res.json({ status: true, data: user ,totalPages })
        } else {
            res.json({ status: false, message: "no users found" })
        }

    } catch (error) {
        console.log(error)
    }
}

const updateuser = async (req, res) => {

    console.log("File upload triggered");
 

    let img = '';
    if (req.file && req.file.originalname) {
        img = req.file.originalname;
    } else {
        const existingUser = await userModel.findById(req.body.id);
        if (existingUser) {
            img = existingUser.imgUrl;
        }
    }




    const { name, email, id } = req.body;

    console.log(req.body);

    const user = await userModel.findOneAndUpdate(
        { _id: id },
        { name, email, imgUrl: img },
        { new: true }
    );

    if (user) {
        res.json({ status: true, message: 'Successfully edited' });
    } else {
        res.json({ status: false, message: 'User not found' });
    }
}

const adminlogout = async (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logout successful' });
}



const adminadduser = async (req, res) => {

    console.log("File upload triggered");
    console.log(req.file, "Request file");
    console.log(req.body, "Request body");

    let img = ""

    const { name, email, password } = req.body;
    console.log(req.file);

    if (req.file && req.file.originalname) {
        img = req.file.originalname;
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        res.json({ status: false, message: 'This email already exists' });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        imgUrl: img || ""
    });

    await newUser.save();

    res.json({ status: true, message: 'user add successfully!' });

}

const deleteuser = async (req, res) => {


    const { userId } = req.body;


    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const result = await userModel.findByIdAndDelete(userId);

        if (!result) {
            return res.json({ status: false, message: 'User not found' });
        }

        res.json({ status: true, message: 'user delete successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

export {
    adminLogin,
    getUser,
    updateuser,
    adminlogout,
    adminadduser,
    deleteuser
}
