const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'Event'
//
const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        unique: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    image_link: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Event', eventSchema);