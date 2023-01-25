const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    address: {
        type: String,
        required: [true, 'Please add a address value']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Please add a gender value']
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Please add a phone number value']
    }
}, { timestamps: true })

module.exports = mongoose.model('Member', memberSchema)