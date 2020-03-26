const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'ResourceLoaned'
//
const resourceLoanedSchema = new Schema({
    loanId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    resourceId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('resourceLoaned', resourceLoanedSchema);