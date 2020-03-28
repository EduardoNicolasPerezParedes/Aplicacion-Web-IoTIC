const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//
// Definición del esquema 'Vision'
//
const visionSchema = new Schema({
    vision: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Vision', visionSchema);