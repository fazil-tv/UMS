
import express from 'express'
import dotenv from 'dotenv'
import userRouts from './routes/userRoutes.js'
import adminRouter from './routes/adminRouts.js'
import { pageNotFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

connectDB()
dotenv.config()

const app = express()


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));


app.use(cookieParser());

const port = process.env.PORT || 4001;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users',userRouts)
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.send('server is ready'))

app.use(pageNotFound)
app.use(errorHandler)




app.listen(port, () => console.log(`server running  on port${port}`))