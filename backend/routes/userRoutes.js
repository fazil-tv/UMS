import express from 'express'
const router = express.Router();

import {
    registerUser,
    logoutUser,
    login,
    getuserProfile,
    updateuserProfile,
    authUser
} from '../controller/userController.js'

import {authenticateUser} from '../middleware/authMiddlewar.js';
import {uploadProfile} from '../middleware/multerMiddleware.js';


router.get('/auth',authenticateUser,authUser)
router.post('/register', registerUser)
router.post('/login',login)
router.post('/logout', logoutUser)
router.get('/profile',getuserProfile); 
router.post('/updateuser', uploadProfile, updateuserProfile)


export default router;