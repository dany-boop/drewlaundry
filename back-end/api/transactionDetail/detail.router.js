const { checkToken } = require('../../auth/tokenValidation')
const {
    getDetailTransaction,
    getDetailTransactionById,
    postDetailTransaction,
    putDetailTransaction,
    deleteDetailTransaction
} = require('./detail.controller')

const router = require('express').Router()

router.get('/', checkToken, getDetailTransaction)
router.post('/', checkToken, postDetailTransaction)
router.get('/:id', checkToken, getDetailTransactionById)
router.put('/:id', checkToken, putDetailTransaction)
router.delete('/:id', checkToken, deleteDetailTransaction)

module.exports = router