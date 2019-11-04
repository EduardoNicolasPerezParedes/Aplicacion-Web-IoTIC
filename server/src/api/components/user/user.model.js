const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//
// Definición del esquema 'User'
//
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    hashed_password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    admitted: {
        type: Boolean,
        default: false
    },
    birth_date: {
        type: Date,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    career: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean
    },
    student: {
        type: Boolean,
        required: true
    },
    semester: {
        type: Number,
        min: 1,
        max: 10
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    // TODO: Agregar atributos: 'image', 'cvlac', 'resume' al esquema
});

//
// Virtuals
// 
userSchema.virtual('password')
.set(function(password) {
    let encrypted_password = this.encryptPassword(password);
    this.hashed_password = encrypted_password;
});

//
// Métodos
//
userSchema.methods = {
    encryptPassword: function(password) {
        let salt = bcrypt.genSaltSync();
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    comparePassword: function(password) {
        return bcrypt.compareSync(password, this.hashed_password);
    }
}

module.exports = mongoose.model('User', userSchema);