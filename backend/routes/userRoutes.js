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

import authenticateUser from '../middleware/authMiddlewar.js';
import {uploadProfile} from '../middleware/multerMiddleware.js';


router.get('/auth', authUser)
router.post('/register', registerUser)
router.post('/login', login)
router.post('/logout', logoutUser)
router.get('/profile', authenticateUser,getuserProfile); 
router.post('/updateuser', uploadProfile, updateuserProfile)


export default router;