const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const Hotel = require('../models/hotel')
const verify = require('../middleware/auth');
const { validationResult, body } = require('express-validator');

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
        const imageURLs = await uploadImages(imageFiles);
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

router.get("/", verify, async(req, res)=>{
    try{
        const hotels = await Hotel.find({userId: req.userId});
        return res.json(hotels);
    }
    catch(errors){
        res.status(500).json({message: "Something went wrong"});
    }
})

router.get("/:id", verify, async(req, res)=>{
    // /api/my-hotels/99492952532 will grab the number in url using /:id which will be stored in request params.
    const id = req.params.id.toString();
    try{
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId
        });
        return res.status(201).json(hotel);
    }
    catch(e){
        res.status(500).json({message: "Something went wrong"});
    }
});

router.put(":/id", verify, upload.array('imageFiles'), async(req, res)=>{
    const id = req.params.id.toString();
    try{
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = Date.now();
        const hotel = await Hotel.findOneAndUpdate({
            userId: req.userId,
            _id: id
        }, updatedHotel, {new: true});

        if(!hotel){
            res.status(400).json({message: "Hotel does not exist"});
        }
        const images = req.files;
        const updatedImageUrls = await uploadImages(images);

        hotel.imageUrls = [...(updatedImageUrls || []), ...(hotel.imageUrls || [])];
        await hotel.save();
        res.status(201).json(hotel);
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
})

async function uploadImages(imageFiles) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageURLs = await Promise.all(uploadPromises);
    return imageURLs;
}

module.exports = router;
