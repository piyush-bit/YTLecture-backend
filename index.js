import express from 'express'
import dbConnect from './dbConnect.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/auth.js'
import exploreRoutes from './Routes/explore.js'
import courseRoute from './Routes/course.js'






dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(cookieParser());
dbConnect();
// app.use(cookieParser);
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/explore',exploreRoutes);
app.use('/api/course/',courseRoute);
app.get('/',(req,res)=>{
    res.send('<h1>Hi there<h1/>')
})

app.listen(port,()=>console.log(`listing to port ${port}`))