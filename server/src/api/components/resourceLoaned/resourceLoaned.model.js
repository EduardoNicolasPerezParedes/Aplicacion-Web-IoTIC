const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'ResourceLoaned'
//
const resourceLoanedSchema = new Schema({
    loanId: {
        type: mongoose.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    resourceId: {
        type: mongoose.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('resourceLoaned', resourceLoanedSchema);