const { checkToken } = require('../../auth/tokenValidation')
const { getOutlet, getOutletById, postOutlet, putOutlet, deleteOutlet } = require('./outlet.controller')

const router = require('express').Router()

router.get('/', checkToken, getOutlet)
router.post('/', checkToken, postOutlet)
router.get('/:id', checkToken, getOutletById)
router.put('/:id', checkToken, putOutlet)
router.delete('/:id', checkToken, deleteOutlet)

module.exports = router