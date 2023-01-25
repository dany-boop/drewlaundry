const ObjectId = require('mongoose').Types.ObjectId
const asyncHandler = require('express-async-handler')

const Transaction = require('./transaction.model')
const DetailTransaction = require('../transactionDetail/detail.model')

// @description     GET All Transaction Data
// @routes          GET /api/transaction/
// @access          Private
const getTransaction = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find()

    res.status(200).json({
        success: 1,
        message: 'Transaction found',
        data: transactions
    })
})

// @description     GET Transaction Data By Id
// @routes          GET /api/transaction/:id
// @access          Private
const getTransactionById = asyncHandler(async (req, res) => {
    const transactionById = await Transaction.findById(req.params.id)

    if (!transactionById) {
        return res.status(404).json({
            success: 0,
            message: 'Transaction not found'
        })
    }

    res.status(200).json({
        success: 1,
        message: 'Transaction found',
        data: transactionById
    })
})

// @description     POST Transaction Data
// @routes          POST /api/transaction/
// @access          Private
const postTransaction = asyncHandler(async (req, res) => {
    data_transaksi = {
        memberId: req.body.memberId,
        date: req.body.date,
        deadline: req.body.deadline,
        datePayment: req.body.datePayment,
        statusPayment: req.body.statusPayment,
        status: req.body.status,
        adminId: req.body.adminId
    }

    if (!req.body.memberId || !req.body.date || !req.body.deadline || !req.body.datePayment || !req.body.statusPayment || !req.body.status || !req.body.adminId) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    }

    const transaction = await Transaction.create(data_transaksi)

    res.status(201).json({
        success: 1,
        message: 'Transaction created successfully',
        data: transaction
    })
})

// @description     PUT Transaction Data
// @routes          PUT /api/transaction/:id
// @access          Private
const putTransaction = asyncHandler(async (req, res) => {
    data_transaksi = {
        memberId: req.body.memberId,
        date: req.body.date,
        deadline: req.body.deadline,
        datePayment: req.body.datePayment,
        statusPayment: req.body.statusPayment,
        status: req.body.status,
        adminId: req.body.adminId
    }

    const checkIfTransactionExist = await Transaction.findById(req.params.id)

    if (!req.body.datePayment || !req.body.statusPayment || !req.body.status) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    } else if (!checkIfTransactionExist) {
        return res.status(404).json({
            success: 0,
            message: 'Transaction not found'
        })
    }

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, data_transaksi, { new: true, runValidators: true })

    res.status(200).json({
        success: 1,
        message: 'Transaction updated successfully',
        data: transaction
    })
})

// @description     DELETE Transaction Data
// @routes          DELETE /api/transaction/:id
// @access          Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const delTransaction = await Transaction.findById(req.params.id)

    if (!delTransaction) {
        return res.status(404).json({
            success: 0,
            message: 'Transaction not found'
        })
    }

    await delTransaction.remove()
    await DetailTransaction.deleteMany({ transactionId: ObjectId(req.params.id) })

    res.status(200).json({
        success: 1,
        _id: req.params.id,
        message: 'Transaction deleted successfully'
    })
})

module.exports = {
    getTransaction,
    getTransactionById,
    postTransaction,
    putTransaction,
    deleteTransaction
}