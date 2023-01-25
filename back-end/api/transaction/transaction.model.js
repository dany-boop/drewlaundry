const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: [true, 'Member ID is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
    datePayment: {
        type: Date,
        required: [true, 'Date Payment is required']
    },
    statusPayment: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid',
        required: [true, 'Please add a status payment value']
    },
    status: {
        type: String,
        enum: ['pending', 'done', 'canceled'],
        default: 'pending',
        required: [true, 'Please add a status value']
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, 'Admin ID is required']
    },
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)