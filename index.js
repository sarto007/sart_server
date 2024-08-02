import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'




const app= express();
dotenv.config();

const connect= async ()=>{
try{
    await mongoose.connect(process.env.MONGO);
    console.log('conncted to mongoDB');
}
catch(error){
    throw error;
}
};
mongoose.connection.on("disconnected", ()=>{
    console.log('MongoDB disconnected!');
});



//middleware   

app.use(cors({  credentials: true, 
    origin: ['http://localhost:3000','https://sarto.netlify.app'], 
    methods:["GET","POST","DELETE","PUT"]
    }))

app.use(express.json())
app.use(cookieParser())
app.options('*', cors());

app.use("/api/auth", authRoute)

app.use((err,req,res,next)=>{
const errStatus= err.status || 500 
const errMessage= err.message || 'Something went wrong'

return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack,

});
})



app.listen(5000, ()=>{
    connect();
    console.log('connected to server')
})
