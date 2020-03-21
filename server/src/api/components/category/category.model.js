const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definición del esquema 'Category'
 */
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    available: {
        type: Boolean,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);