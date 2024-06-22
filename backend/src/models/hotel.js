const mongoose = require('mongoose');
//deconstructing schema function from mongoose
const {Schema} = mongoose;

const hotelSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    adults: {type: String, required: true},
    children: {type: String, required: true},
    facilities: [{type: String, required: true}],
    pricePerNight: {type: String, required: true},
    starrating: {type: String, required: true, min: 1, max: 5},
    imageUrls: [{type: String, required: true}],
    lastUpdated: {type: Date, required: true}
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;