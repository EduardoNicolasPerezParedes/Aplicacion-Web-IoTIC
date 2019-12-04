const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Definición del esquema 'Message'
//
const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    send_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);