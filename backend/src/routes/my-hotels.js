const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const Hotel = require('../models/hotel')
const verify = require('../middleware/auth');
const { check, validationResult, body } = require('express-validator');

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/',
    upload.array("imageFiles", 6) ,
    [
    body("name").isString().withMessage( "Valid name is required"),
    body("city", "Valid city is required").isString(),
    body("country", "Valid country is required").isString(),
    body("description", "Valid description is required").isString(),
    body("pricePerNight", "Valid Price is required").isString(),
    body("starrating", "Valid Star Rating is required").isString(),
    body("facilities", "Valid facilities are required").isArray(),
    body("type", "Valid Hotel Type is required").isString(),
    body("adults", "Valid Adult Count is required").isString(),
    body("children", "Valid Child Count is required").isString(),
    ],
    verify,
    async(req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Please check the values"});
        }
        
        const imageFiles = req.files
        const newhotel = req.body
        //upload files to cloudinary and get urls
        const uploadPromises = imageFiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:"+image.mimetype+";base64,"+b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageURLs = await Promise.all(uploadPromises);
        //if upload is success add hotel to database
        newhotel.imageUrls = imageURLs;
        newhotel.lastUpdated = new Date(0);
        newhotel.userId = req.userId;
        //save the hotel in our database
        const hotel = new Hotel(newhotel);
        await hotel.save();
        res.status(201).send(hotel);

    }
    catch(e){
        console.log("error creating hotel: ", e);
        res.status(500).json({message: "Something went wrong!"});
    }
})

module.exports = router;