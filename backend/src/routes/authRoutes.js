const express = require('express');
const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login",[
    check("email", "Valid email is required for login").isEmail().notEmpty(),
    check("password", "Password is required for login").notEmpty()
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({message: errors.array()});
    }
    try{
        let user = await User.findOne({
            email: req.body.email
        })
        if(!user){
            res.status(401).json({message: "Invalid Login Credentials!"});
        }

        const isValidUser = await bcrypt.compare(req.body.password, user.password);
        if(!isValidUser){
            res.status(401).json({message: "Invalid Login Credentials!"});
        }
        else{
            const token = jwt.sign({userId: user.id}, process.env.JWT_KEY, {
                expiresIn: "1d"
            });
            res.cookie("authtoken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "prod",
                maxAge: 86400000
            });

            res.status(200).json({userId: user._id});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
});

module.exports = router;