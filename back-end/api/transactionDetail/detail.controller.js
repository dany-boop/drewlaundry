const asyncHandler = require('express-async-handler')

const DetailTransaction = require('./detail.model')

// @description     GET All Transaction Detail Data
// @routes          GET /api/transaction-detail/
// @access          Private
const getDetailTransaction = asyncHandler(async (req, res) => {
    const detailTransactions = await DetailTransaction.find()

    res.status(200).json({
        success: 1,
        message: 'Detail Transaction found',
        data: detailTransactions
    })
})

// @description     GET Transaction Detai Data By Id
// @routes          GET /api/transaction-detail/:id
// @access          Private
const getDetailTransactionById = asyncHandler(async (req, res) => {
    const detailTransactionById = await DetailTransaction.find({ transactionId: req.params.id })

    if (!detailTransactionById) {
        return res.status(404).json({
            success: 0,
            message: 'Detail Transaction not found'
        })
    }

    res.status(200).json({
        success: 1,
        message: 'Detail Transaction found',
        data: detailTransactionById
    })
})

// @description     POST Transaction Detail Data
// @routes          POST /api/transaction-detail/
// @access          Private
const postDetailTransaction = asyncHandler(async (req, res) => {
    data_detail_transaksi = {
        transactionId: req.body.transactionId,
        packageId: req.body.packageId,
        quantity: req.body.quantity,
    }

    if (!req.body.transactionId || !req.body.packageId || !req.body.quantity) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    }

    const detailTransaction = await DetailTransaction.create(data_detail_transaksi)

    res.status(200).json({
        success: 1,
        message: 'Detail Transaction created successfully',
        data: detailTransaction
    })
})

// @description     PUT Transaction Detail Data
// @routes          PUT /api/transaction/:id
// @access          Private
const putDetailTransaction = asyncHandler(async (req, res) => {
    data_detail_transaksi = {
        transactionId: req.body.transactionId,
        packageId: req.body.packageId,
        quantity: req.body.quantity,
    }

    const checkIfDetailTransactionExist = await DetailTransaction.findById(req.params.id)

    if (!req.body.transactionId || !req.body.packageId || !req.body.quantity || !req.body.price || !req.body.total) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    } else if (!checkIfDetailTransactionExist) {
        return res.status(404).json({
            success: 0,
            message: 'Detail Transaction not found'
        })
    }

    const detailTransaction = await DetailTransaction.findByIdAndUpdate(req.params.id, data_detail_transaksi, { new: true, runValidators: true })

    res.status(200).json({
        success: 1,
        message: 'Detail Transaction updated successfully',
        data: detailTransaction
    })
})

// @description     DELETE Transaction Detail Data
// @routes          DELETE /api/transaction-detail/:id
// @access          Private
const deleteDetailTransaction = asyncHandler(async (req, res) => {
    const delDetailTransaction = await DetailTransaction.find({ transactionId: req.params.id })

    if (!delDetailTransaction) {
        return res.status(404).json({
            success: 0,
            message: 'Detail Transaction not found'
        })
    }

    await delDetailTransaction.remove()

    res.status(200).json({
        success: 1,
        _id: req.params.id,
        message: 'Detail Transaction deleted successfully'
    })
})

module.exports = {
    getDetailTransaction,
    getDetailTransactionById,
    postDetailTransaction,
    putDetailTransaction,
    deleteDetailTransaction
}