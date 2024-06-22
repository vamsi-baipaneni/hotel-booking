require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const logoutValidateRoutes = require('./routes/logoutValidateRoutes');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const myHotelRoutes = require("./routes/my-hotels");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const mongo_connect = async (MONGO_URL)=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("connected to mongdb");
    }
    catch(error){
        console.log("error connecting to mongodb server: ", error);
    }
}

mongo_connect(MONGO_URL);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.get("/api/test", async (req,res)=>{
    res.json({message: "hello"});
});

app.use("/api/auth", userRoutes);
app.use("/api/users", authRoutes);
app.use("/api/verify", logoutValidateRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.listen(PORT, ()=>{
    console.log(`server runnning on ${PORT}`);
});