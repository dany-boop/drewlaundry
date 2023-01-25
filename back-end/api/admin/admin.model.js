const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    email: {
        type: String,
        required: [true, 'Please add a email value'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password value']
    },
    role: {
        type: String,
        enum: ['admin', 'cashier', 'owner'],
        default: 'cashier',
        required: [true, 'Please add a role value']
    }
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema)