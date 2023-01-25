const { checkToken } = require('../../auth/tokenValidation')
const { getTransaction, getTransactionById, postTransaction, putTransaction, deleteTransaction } = require('./transaction.controller')

const router = require('express').Router()

router.get('/', checkToken, getTransaction)
router.post('/', checkToken, postTransaction)
router.get('/:id', checkToken, getTransactionById)
router.put('/:id', checkToken, putTransaction)
router.delete('/:id', checkToken, deleteTransaction)

module.exports = router