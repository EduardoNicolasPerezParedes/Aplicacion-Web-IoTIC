const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'Course'
//
const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        lowercase: true,
        unique: true
    },
    teacher: {
        type: String,
        required: true
    },
    starts_at: {
        type: Date,
        required: true
    },
    ends_at: {
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
    },
    moodle_link: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);