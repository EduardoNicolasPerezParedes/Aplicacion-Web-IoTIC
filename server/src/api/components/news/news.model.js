const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'News'
//
const newsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        lowercase: true,
        unique: true
    },
    development: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('News', newsSchema);