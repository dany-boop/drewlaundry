const mongoose = require('mongoose')

const outletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    address: {
        type: String,
        required: [true, 'Please add a address value']
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Please add a phone number value']
    }
}, { timestamps: true })

module.exports = mongoose.model('Outlet', outletSchema)