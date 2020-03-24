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
    created_at: {
        type: Date,
        default: Date.now()
    },
    image_link: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('News', newsSchema);