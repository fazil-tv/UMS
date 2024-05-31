import express from 'express'


import {
    adminLogin,
    getUser
} from '../controller/adminController.js'

const router = express.Router();

router.post('/adminlogin',adminLogin)

router.get('/getUser',getUser)


export default router;