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
    }
    // TODO: Agregar el atributo 'image_link'
});

module.exports = mongoose.model('Course', courseSchema);