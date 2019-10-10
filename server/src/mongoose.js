const db = require('./config/database');
const mongoose = require('mongoose');

// connection events
mongoose.connection.on('connected', () => {
    console.log('server: database connected.');
});

mongoose.connection.on('reconnected', () => {
    console.log('server: database connections re-established.');
});

mongoose.connection.on('disconnected', () => {
    console.log('server: database disconnected.');
});

mongoose.connection.on('close', () => {
    console.log('server: database closed.');
});

const connect = async () => {
    await mongoose.connect(db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}

module.exports = connect;