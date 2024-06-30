const express = require('express');
const { verify } = require('jsonwebtoken');
const Hotel = require('../models/hotel');

const router = express.Router();

router.get("/search", verify, async(req, res)=>{
    try{
        const pageNumber = parseInt(req.query.pageNumber ? req.query.pageNumber.toString() : "1");
        const tilesPerPage = 5;
        //page 2 then 1*5 we skip first 5 hotels to access next 5;
        const skip = (pageNumber-1)*tilesPerPage;

        const hotels = await Hotel.find().skip(skip).limit(tilesPerPage);
        const total = await Hotel.countDocuments();
        const response = {
            data: hotels,
            pagination: {
                total,
                pageNumber: pageNumber,
                pages: Math.ceil(total/tilesPerPage)
            }
        };
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"})
    }
})

module.exports = router;