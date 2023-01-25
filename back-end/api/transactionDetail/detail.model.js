const mongoose = require('mongoose')

const detailTransactionSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: [true, 'Transaction ID is required']
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: [true, 'Package ID is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
}, { timestamps: true })

module.exports = mongoose.model('DetailTransaction', detailTransactionSchema)