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
    adults: {type: Number, required: true},
    children: {type: Number, required: true},
    facilities: [{type: String, required: true}],
    pricePerNight: {type: Number, required: true},
    starrating: {type: Number, required: true, min: 1, max: 5},
    imageUrls: [{type: String, required: true}],
    lastUpdated: {type: Date, required: true}
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;