import express from 'express'
import bodyParser from 'body-parser';
import dbConnect from './dbConnect.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/auth.js'
import exploreRoutes from './Routes/explore.js'
import courseRoute from './Routes/course.js'
import createCourseRoute from './Routes/createCourse.js'
import userRoute from './Routes/users.js'
import generateRoute from './Routes/generate.js'
import searchRoute from './Routes/search.js'
import Tags from './Models/Tags.js';






dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors({
    origin: process.env.CORS_ADD,
    credentials: true,
  }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cookieParser());
dbConnect();
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/explore',exploreRoutes);
app.use('/api/course',courseRoute);
app.use('/api/user',userRoute);
app.use('/api/generate',generateRoute);
app.use('/api/createcourse',createCourseRoute)
app.use('/api/search',searchRoute)
app.get('/',(req,res)=>{
    res.send('<h1>Hi there<h1/>')
})
app.get('/tag',async (req,res)=>{
    const t =  await Tags.find({});
    console.log(t)
    res.send(t)
})
app.listen(port,()=>console.log(`listing to port ${port}`))