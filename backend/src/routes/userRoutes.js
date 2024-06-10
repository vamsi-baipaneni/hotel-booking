const express = require('express');
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {check, validationResult}  = require('express-validator');

router.post("/register", [
    check("email", "Valid Email is Required").isEmail(),
    check("password", "Valid Password is Required").isString().isLength({min:8}),
    check("firstName", "First Name is Required").isString(),
    check("lastName", "Last Name is Required").isString(),
    check("countryCode", "Country Code is Required").isString(),
    check("phoneNumber", "Valid Phone Number is Required").isString().isLength({min:10, max: 10})

], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }
    try{
        let userEmail = await User.findOne({
            email: req.body.email, //we will check if the email passed in request body matches any existing user.
        });
        let userPhone = await User.findOne({
            phoneNumber: req.body.phoneNumber
        })
        if(userEmail && userPhone){
            return res.status(400).json({message: "This user is already registered. Please login"});
        }
        else if(userEmail){
            return res.status(400).json({message: "Email already registered!"});
        }
        else if(userPhone){
            return res.status(400).json({message: "Phone number already registered!"});
        }


        user = new User(req.body);
        await user.save();

        const token = jwt.sign({userID: user.id}, process.env.JWT_KEY, {
            expiresIn: "1d"
        });

        res.cookie("authtoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV==='prod',
            maxAge: 86400000
        });

        return res.status(200).json({message: "User registered successfully!!"});
    }
    catch(error){
        console.log(error);
       return res.status(500).json({message: "Something went wrong!!"});
    }
});

module.exports = router;