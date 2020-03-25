const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'ResourceLoaned'
//
const resourceLoanedSchema = new Schema({
    loandId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    resourceId: {
        type: Boolean,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('resourceLoaned', resourceLoanedSchema);