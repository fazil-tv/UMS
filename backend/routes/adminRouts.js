import express from 'express'


import {
    adminLogin,
    getUser,
    updateuser,
    adminlogout,
    adminadduser,
    deleteuser
} from '../controller/adminController.js'
import {uploadProfile} from '../middleware/multerMiddleware.js';


const router = express.Router();

router.post('/adminlogin',adminLogin)

router.get('/getUser',getUser)

router.post('/updateuser',uploadProfile,updateuser)

router.post('/adminlogout',adminlogout)

router.post('/adminadduser',uploadProfile,adminadduser)

router.post('/deleteuser',deleteuser)
export default router;