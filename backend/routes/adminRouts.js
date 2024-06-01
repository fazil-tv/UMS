import express from 'express'


import {
    adminLogin,
    getUser,
    updateuser
} from '../controller/adminController.js'
import {uploadProfile} from '../middleware/multerMiddleware.js';


const router = express.Router();

router.post('/adminlogin',adminLogin)

router.get('/getUser',getUser)

router.post('/updateuser',uploadProfile,updateuser)

export default router;