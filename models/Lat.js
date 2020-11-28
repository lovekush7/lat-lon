const mongoose = require('mongoose');


const LocSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },

    longitude: {
        type: String,
        required: true
    },
    address: {
        type: String
    }


});


module.exports = mongoose.model('Lat', LocSchema);