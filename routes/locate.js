const express = require('express');
const {
    getLocations,
    createLocations,
    getLocation
} = require('../controller/locationControl');

const router = express.Router();

router.route('/').get(getLocations).post(createLocations);

router.route('/:id').get(getLocation);


module.exports = router;