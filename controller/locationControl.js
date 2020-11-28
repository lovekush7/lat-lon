const Lat = require('../models/Lat');
var MongoClient = require('mongodb').MongoClient;


// @desc  Get all locations
// @route GET /api/locate
// @access Public
exports.getLocations = async(req, res, next) => {
    try {
        const locate = await Lat.find();
        res.status(200).json({ success: true, count: locate.length, data: locate });
    } catch (error) {
        next(error);
    }
};

// @desc  Get single location by id
// @route GET /api/locate
// @access Public
exports.getLocation = async(req, res, next) => {
    try {
        const locate = await Lat.findById(req.params.id);
        if (!locate) {
            //return res.status(400).json({ success: false })
            return next(new errorResponse(`location is not found with id of ${req.params.id}`, 404)); // for same formatted id but not in db
        }
        res.status(200).json({ success: true, data: locate });
    } catch (error) {
        next(error);
    }
};

// @desc  Post all locations
// @route POST /api/locate
// @access Public
exports.createLocations = async(req, res, next) => {
    // var MONGO_URI = "mongodb+srv://root:root@cluster0.h7soh.mongodb.net/<dbname>?retryWrites=true&w=majority";

    // Replace the uri string with your MongoDB deployment's connection string.
    const uri = process.env.MONGO_URI;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("bond");
        const collection = database.collection("james");

        // Query for a movie that has the title 'The Room'
        const query = { 'latitude': req.body.latitude, 'longitude': req.body.longitude };
        // console.log(query);

        const options = {
            // sort matched documents in descending order by rating
            sort: { rating: -1 }
            // Include only the `title` and `imdb` fields in the returned document
            // projection: {  },
        };

        const movie = await collection.findOne(query, options);
        res.status(200).json({ success: true, data: movie });

        // since this method returns the matched document, not a cursor, print it directly
        console.log(movie);
    } catch {
        res.status(400).json({ success: false, msg: 'invalid details' })
    }
};
// MongoClient.connect(MONGO_URI, function(err, db) {
//     if (err) throw err;
//     // var dbo = db.db("lats");
//     /*Return only the documents with the address "Park Lane 38":*/
//     var query = { latitude: "12.99" };
//     // dbo.collection("lats").find(query).toArray(function(err, result) {
//     db.lats.find([{ "latitude": 12.99 }, { "longitude": 11.1 }])
//     if (err) throw err;
//     console.log(result);
//     db.close();

// });

// const { error } = req.body;
// const cord = await Lat.findOne({ lat: req.body.latitude }, (err, lat) => {
//     console.log(lat);
// });
// const coordinate = await Lat.findOne({ lon: req.body.longitude }, (err, lon) => {
//     console.log(lon);
// });
// console.log(cord);
// if (!cord && !coordinate) {
//     res.status(400).json({ message: 'Invalid lat & lon' })
// } else {
//     res.status(201).json({ success: true, data: cord.address });
// }