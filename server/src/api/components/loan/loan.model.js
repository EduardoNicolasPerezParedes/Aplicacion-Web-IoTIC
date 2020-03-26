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
    dateApproved: {
        type: Date
    },
    dateEnd: {
        type: Date
    },
    image_resource_link: {
        type: String
    },
    image_format_link: {
        type: String
    },
    state: {
        type: Number
    }
});

module.exports = mongoose.model('Loan', loanSchema);