const config = require('./config/config');
const express = require('express');
const morgan = require('morgan');
const restRouter = require('./api');
const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// development
if (config.env === 'dev') { 
    app.use(morgan('dev'));
    app.use(cors({ origin: 'http://localhost:4200' }));
}

// REST router
app.use('/api', restRouter);

module.exports = app;