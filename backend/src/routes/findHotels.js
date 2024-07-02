const express = require('express');
const { verify } = require('jsonwebtoken');
const Hotel = require('../models/hotel');

const router = express.Router();

router.get("/search", verify, async(req, res)=>{
    try{

        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch(req.query.sortOption){
            case "starRating":
                sortOptions = {starRating: -1};
                break
            case "pricePerNightAsc":
                sortOptions = {pricePerNight: 1}
                break
            case "pricePerNightDesc":
                sortOptions = {pricePerNight: -1}
                break;
        }
        const pageNumber = parseInt(req.query.pageNumber ? req.query.pageNumber.toString() : "1");
        const tilesPerPage = 5;
        //page 2 then 1*5 we skip first 5 hotels to access next 5;
        const skip = (pageNumber-1)*tilesPerPage;

        const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(tilesPerPage);
        const total = await Hotel.countDocuments(query);
        const response = {
            hotels: hotels,
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

const constructSearchQuery = (queryParams)=>{
    const constructedQuery = {}

    if(queryParams.destination && queryParams.destination.trim() !== "" ){
        constructedQuery.$or = [
            {city: new RegExp(queryParams.destination.toString(), "i")},
            {country: new RegExp(queryParams.destination.toString(), "i")}
        ];
    }

    if(queryParams.adultCount){
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount.toString())
        }
    }

    if(queryParams.childCount){
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount.toString())
        }
    }

    return constructedQuery;
}

module.exports = router;