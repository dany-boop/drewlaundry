const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price value']
    }
}, { timestamps: true })

module.exports = mongoose.model('Package', packageSchema)