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
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: false
    }
});

module.exports = mongoose.model('Resource', resourceSchema);