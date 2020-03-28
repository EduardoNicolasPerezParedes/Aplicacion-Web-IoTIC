const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//
// Definición del esquema 'Mission'
//
const missionSchema = new Schema({
    mission: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mission', missionSchema);