const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
//load env vars
dotenv.config({ path: './config/config.env' });
connectDB();
//route files
const locate = require('./routes/locate');
const app = express();
//body-parser
app.use(express.json());
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // predefined method-morgan(':method :url :status :res[content-length] - :response-time ms')
}
//app.use(logger); --without using morgan(less details than morgan - response status, time etc)

//MOUNT routers
app.use('/api/locate/', locate);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
    console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`.cyan));