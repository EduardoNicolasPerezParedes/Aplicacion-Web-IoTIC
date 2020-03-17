const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'Resource'
//
const resourceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image_link: {
        type: String,
        default: ""
    }
});

// TODO: Agregar la referencia a la categoría

module.exports = mongoose.model('Resource', resourceSchema);