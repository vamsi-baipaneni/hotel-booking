require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const logoutValidateRoutes = require('./routes/logoutValidateRoutes');
const cookieParser = require('cookie-parser');

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

app.listen(PORT, ()=>{
    console.log("server running on port 3000");
});