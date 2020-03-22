const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'Loan'
//
const loanSchema = new Schema({
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Loan', loanSchema);