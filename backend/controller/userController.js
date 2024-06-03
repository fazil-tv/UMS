
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import dotenv from 'dotenv'
dotenv.config()



const authUser = (async (req, res) => {
    res.json({ status: true, message: 'welcome to home' });
});


const registerUser = (async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('dd1');
        res.json({ status: false, message: 'This email already exists' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    const userData = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        imgUrl: newUser.imgUrl
    };

    res.json({ status: true, message: 'Signed up successfully!' ,userData});
});


const login = async (req, res) => {
    const { email, password } = req.body;
    

    const user = await User.findOne({ email });
    
    if (user) {
      
        const check = await bcrypt.compare(password, user.password);
        if (check) {
        
            const token = jwt.sign({ id: user._id }, process.env.WEB_TOKEN, { expiresIn: '1d' });

            console.log(token);
      

            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                imgUrl: user.imgUrl ? user.imgUrl : ""
            };

            console.log(userData)
            res.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.json({ status: true, message: 'Login successful!', userData });
            
        } else {

            res.json({ status: false, message: 'Invalid email or password.' });
        }
    } else {
        res.json({ status: false, message: 'User not found.' });

    }
};


const updateuserProfile = async (req, res) => {

    console.log("File upload triggered");
    console.log(req.body, "Request body");
    console.log(req.file, "Uploaded file");

    let img = '';
    if (req.file && req.file.originalname) {
        img = req.file.originalname;
    } else {
        const existingUser = await User.findById(req.body.id);
        if (existingUser) {
            img = existingUser.imgUrl;
        }
    }

    const { name, email, id } = req.body;

    const user = await User.findOneAndUpdate(
        { _id: id },
        { name, email, imgUrl: img },
        { new: true }
    );
    
    if (user) {
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            imgUrl: user.imgUrl
        };
        
        res.json({ status: true, message: 'Successfully edited', userData });
    } else {
        res.json({ status: false, message: 'User not found' });
    }
};

const getuserProfile = async (req, res) => {
    try {

      

      const user = await User.findById();

   
  
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found.' });
      }
  
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        imgUrl: user.imgUrl
      };

      console.log(userData);
      
      res.json({ status: true, userData });
    } catch (error) {
      return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
  };

const logoutUser = async (req, res) => {
    res.clearCookie('access_token');
    res.json({ status: true, message: 'logged out successfully' });
};



export {
    authUser,
    login,
    registerUser,
    logoutUser,
    getuserProfile,
    updateuserProfile
}